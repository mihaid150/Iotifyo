package com.daian.iotify.user_sensor_controller;

import com.daian.iotify.config.JWTService;
import com.daian.iotify.sensor_model.Sensor;
import com.daian.iotify.sensor_model.SensorRepository;
import com.daian.iotify.sensor_type.SensorType;
import com.daian.iotify.sensor_type.SensorTypeRepository;
import com.daian.iotify.user.User;
import com.daian.iotify.user.UserRepository;
import com.daian.iotify.user.UserSensor;
import com.daian.iotify.user.UserSensorRepository;
import java.util.Collections;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class UserSensorService {
    private final UserSensorRepository userSensorRepository;
    private final UserDetailsService userDetailsService;
    private final UserRepository userRepository;
    private final SensorTypeRepository sensorTypeRepository;
    private final SensorRepository sensorRepository;
    private final JWTService jwtService;

    public void saveUserSensor(UserSensorRequest request, String token){
        UserDetails userDetails = userDetailsService.loadUserByUsername(jwtService.extractUsername(token));
        if(jwtService.isTokenValid(token, userDetails)){
            Optional<SensorType> sensorTypeOptional = sensorTypeRepository.findSensorTypeByTypeName(request.getTypeName());
            if(sensorTypeOptional.isPresent()) {
                Optional<User> userOptional = userRepository.findByEmail(jwtService.extractUsername(token));
                Optional<Sensor> sensorOptional = sensorRepository.findSensorBySensorNameAndAndSensorType(request.getSensorName(), sensorTypeOptional.get());
                if(userOptional.isPresent() && sensorOptional.isPresent()){
                    User user = userOptional.get();
                    Sensor sensor = sensorOptional.get();
                    UserSensor userSensor = UserSensor
                            .builder()
                            .user(user)
                            .sensor(sensor)
                            .build();
                    userSensorRepository.save(userSensor);
            }

            }
        }
    }
    public List<UserSensorResponse> getUserSensors(String token){
        UserDetails userDetails = userDetailsService.loadUserByUsername(jwtService.extractUsername(token));
        if(jwtService.isTokenValid(token, userDetails)){
            Optional<User> userOptional = userRepository.findByEmail(jwtService.extractUsername(token));
            if(userOptional.isPresent()){
                int userId = userOptional.get().getId();
                List<Optional<UserSensor>> optionalUserSensorsList = userSensorRepository.findByUserId(userId);
                long count = optionalUserSensorsList.stream().filter(Optional::isPresent).count();
                if(count == optionalUserSensorsList.size()){
                    List<Sensor> sensorsList = optionalUserSensorsList
                            .stream()
                            .filter(Optional::isPresent)
                            .map(Optional::get)
                            .map(UserSensor::getSensor)
                            .toList();
                    return  sensorsList
                            .stream()
                            .map(sensor -> UserSensorResponse
                                    .builder()
                                    .sensor(sensor)
                                    .build())
                            .collect(Collectors.toList());
                }

            }
        }
        return Collections.emptyList();
    }
}
