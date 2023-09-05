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
import java.util.UUID;

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
                SensorType sensorType = sensorTypeOptional.get();
                Optional<Sensor> sensorOptional = sensorRepository.findSensorBySensorNameAndSensorType(request.getSensorName(), sensorType);
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
                UUID userId = userOptional.get().getId();
                Optional<List<UserSensor>> optionalUserSensorsList = userSensorRepository.findByUserId(userId);
                if(optionalUserSensorsList.isPresent()){
                    List<UserSensor> userSensors = optionalUserSensorsList.get();
                    List<Sensor> sensorsList = userSensors
                            .stream()
                            .map(UserSensor::getSensor)
                            .toList();
                    return  sensorsList
                            .stream()
                            .map(sensor -> UserSensorResponse
                                    .builder()
                                    .sensor(sensor)
                                    .build())
                            .toList();
                }
            }
        }
        return Collections.emptyList();
    }
}
