package com.daian.iotify.sensor_controller;

import com.daian.iotify.config.JWTService;
import com.daian.iotify.sensor_model.Sensor;
import com.daian.iotify.sensor_model.SensorRepository;
import com.daian.iotify.sensor_type.SensorType;
import com.daian.iotify.sensor_type.SensorTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class SensorService {
    private final SensorRepository sensorRepository;
    private final UserDetailsService userDetailsService;
    private final SensorTypeRepository sensorTypeRepository;
    private final JWTService jwtService;

    public void saveSensor(SensorRequest request, String token){
        UserDetails userDetails = userDetailsService.loadUserByUsername(jwtService.extractUsername(token));
        if(jwtService.isTokenValid(token, userDetails)){
            Optional<SensorType> sensorTypeOptional = sensorTypeRepository.findSensorTypeByTypeName(request.getSensorType());
            if(sensorTypeOptional.isPresent()){
                Sensor sensor = Sensor
                        .builder()
                        .sensorType(sensorTypeOptional.get())
                        .sensorName(request.getSensorName())
                        .isActive(request.getIsActive())
                        .minimumRange(request.getMinimumRange())
                        .maximumRange(request.getMaximumRange())
                        .unitOfMeasurement(request.getUnitOfMeasurement())
                        .otherDetails(request.getOtherDetails())
                        .build();
                sensorRepository.save(sensor);
            }
        }
    }

    public List<SensorResponse> getSensors(String token){
        UserDetails userDetails = userDetailsService.loadUserByUsername(jwtService.extractUsername(token));
        if(jwtService.isTokenValid(token, userDetails)){
            List<Sensor> sensors = sensorRepository.findAll();
            return sensors
                    .stream()
                    .map(sensor -> SensorResponse
                            .builder()
                            .sensor(sensor)
                            .build())
                    .collect(Collectors.toList());
        }
        return Collections.emptyList();
    }

    public List<String> getSensorType(String sensorName, String token){
        UserDetails userDetails = userDetailsService.loadUserByUsername(jwtService.extractUsername(token));
        if(jwtService.isTokenValid(token, userDetails)){
            List<Optional<Sensor>> sensorOptional = sensorRepository.findSensorBySensorName(sensorName);
            long count = sensorOptional.stream().filter(Optional::isPresent).count();
            if(count == sensorOptional.size()){
                return sensorOptional
                        .stream()
                        .filter(Optional::isPresent)
                        .map(Optional::get)
                        .map(Sensor::getSensorType)
                        .map(SensorType::getTypeName)
                        .toList();
            }
        }
        return Collections.emptyList();
    }
}
