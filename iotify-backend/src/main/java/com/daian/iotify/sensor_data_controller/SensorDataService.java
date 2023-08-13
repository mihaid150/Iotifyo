package com.daian.iotify.sensor_data_controller;

import com.daian.iotify.config.JWTService;
import com.daian.iotify.sensor_data_model.SensorData;
import com.daian.iotify.sensor_data_model.SensorDataRepository;
import com.daian.iotify.sensor_model.Sensor;
import com.daian.iotify.sensor_model.SensorRepository;
import com.daian.iotify.sensor_type.SensorType;
import com.daian.iotify.sensor_type.SensorTypeRepository;
import com.daian.iotify.user.User;
import com.daian.iotify.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.ResolverStyle;
import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class SensorDataService {
    private final SensorDataRepository sensorDataRepository;
    private final UserDetailsService userDetailsService;
    private final UserRepository userRepository;
    private final SensorRepository sensorRepository;
    private final SensorTypeRepository sensorTypeRepository;
    private final JWTService jwtService;

    public void saveSensorValue(SensorDataRequest request, String sensorName, String typeName, String token) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(jwtService.extractUsername(token));
        if(jwtService.isTokenValid(token, userDetails)){
            Optional<SensorType> sensorTypeOptional = sensorTypeRepository.findSensorTypeByTypeName(typeName);
            if(sensorTypeOptional.isPresent()){
                Optional<User> userOptional = userRepository.findByEmail(jwtService.extractUsername(token));
                Optional<Sensor> sensorOptional = sensorRepository.findSensorBySensorNameAndAndSensorType(sensorName, sensorTypeOptional.get());
                if(userOptional.isPresent() && sensorOptional.isPresent()){
                    User user = userOptional.get();
                    Sensor sensor = sensorOptional.get();
                    SensorData sensorData = SensorData
                            .builder()
                            .user(user)
                            .sensor(sensor)
                            .dateTime(LocalDateTime.now())
                            .value(request.getValue())
                            .build();
                    sensorDataRepository.save(sensorData);
                }
            }
        }
    }

    public List<SensorDataResponse> getSensorDataList(String date, String sensorName, String typeName, String token) {
        String formattedDate = date.substring(0, 3) + Character.toUpperCase(date.charAt(3)) + date.substring(4).toLowerCase();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MMMM-yyyy", Locale.ENGLISH).withResolverStyle(ResolverStyle.SMART);
        LocalDate searchedDate = LocalDate.parse(formattedDate, formatter);

        UserDetails userDetails = userDetailsService.loadUserByUsername(jwtService.extractUsername(token));
        if(jwtService.isTokenValid(token, userDetails)) {
            Optional<SensorType> sensorTypeOptional = sensorTypeRepository.findSensorTypeByTypeName(typeName);
            if(sensorTypeOptional.isPresent()){
                Optional<User> userOptional = userRepository.findByEmail(jwtService.extractUsername(token));
                Optional<Sensor> sensorOptional = sensorRepository.findSensorBySensorNameAndAndSensorType(sensorName, sensorTypeOptional.get());
                if(userOptional.isPresent() && sensorOptional.isPresent()) {
                    User user = userOptional.get();
                    Sensor sensor = sensorOptional.get();
                    List<Optional<SensorData>> sensorDataOptional = sensorDataRepository.findSensorDataByUserAndSensor(user, sensor);
                    long count = sensorDataOptional.stream().filter(Optional::isPresent).count();
                    if(count == sensorDataOptional.size()) {
                        List<SensorData> sensorDataList = sensorDataOptional
                                .stream()
                                .filter(Optional::isPresent)
                                .map(Optional::get)
                                .filter(data ->
                                            data.getDateTime().getDayOfMonth() == searchedDate.getDayOfMonth() &&
                                            data.getDateTime().getMonth() == searchedDate.getMonth() &&
                                            data.getDateTime().getYear() == searchedDate.getYear())
                                .toList();
                        return sensorDataList
                                .stream()
                                .map(data -> SensorDataResponse
                                        .builder()
                                        .dateTime(data.getDateTime())
                                        .value(data.getValue())
                                        .build())
                                .toList();
                    }
                }
            }
        }
        return Collections.emptyList();
    }

    public Set<DateResponse> getDataDate(String sensorName, String typeName, String token) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(jwtService.extractUsername(token));
        if(jwtService.isTokenValid(token, userDetails)) {
            Optional<SensorType> sensorTypeOptional = sensorTypeRepository.findSensorTypeByTypeName(typeName);
            if(sensorTypeOptional.isPresent()) {
                Optional<User> userOptional = userRepository.findByEmail(jwtService.extractUsername(token));
                Optional<Sensor> sensorOptional = sensorRepository.findSensorBySensorNameAndAndSensorType(sensorName, sensorTypeOptional.get());
                if(userOptional.isPresent() && sensorOptional.isPresent()) {
                    User user = userOptional.get();
                    Sensor sensor = sensorOptional.get();
                    List<Optional<SensorData>> sensorDataOptional = sensorDataRepository.findSensorDataByUserAndSensor(user, sensor);
                    long count = sensorDataOptional.stream().filter(Optional::isPresent).count();
                    if(count == sensorDataOptional.size()){
                        List<SensorData> sensorDataList = sensorDataOptional
                                .stream()
                                .filter(Optional::isPresent)
                                .map(Optional::get)
                                .toList();
                        return sensorDataList
                                .stream()
                                .map(data -> DateResponse
                                        .builder()
                                        .day(data.getDateTime().getDayOfMonth())
                                        .month(data.getDateTime().getMonth().toString())
                                        .year(data.getDateTime().getYear())
                                        .build())
                                .collect(Collectors.toSet());

                    }
                }
            }
        }
        return Collections.emptySet();
    }

}
