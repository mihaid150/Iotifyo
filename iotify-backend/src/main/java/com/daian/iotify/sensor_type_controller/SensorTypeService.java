package com.daian.iotify.sensor_type_controller;

import com.daian.iotify.config.JWTService;
import com.daian.iotify.sensor_type.SensorType;
import com.daian.iotify.sensor_type.SensorTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class SensorTypeService {
    private final SensorTypeRepository sensorTypeRepository;
    private final UserDetailsService userDetailsService;
    private final JWTService jwtService;

    public void saveSensorType(SensorTypeRequest request, String token){
        UserDetails userDetails = userDetailsService.loadUserByUsername(jwtService.extractUsername(token));
        if(jwtService.isTokenValid(token, userDetails)){
            SensorType sensorType = SensorType
                    .builder()
                    .typeName(request.getTypeName())
                    .typeDetails(request.getTypeDetails())
                    .build();
            sensorTypeRepository.save(sensorType);
        }
    }

    public List<SensorTypeResponse> getSensorsType(String token){
       UserDetails userDetails = userDetailsService.loadUserByUsername(jwtService.extractUsername(token));
       if(jwtService.isTokenValid(token, userDetails)){
           List<SensorType> sensorTypes = sensorTypeRepository.findAll();
           return sensorTypes
                   .stream()
                   .map(sensorType -> SensorTypeResponse
                           .builder()
                           .typeName(sensorType.getTypeName())
                           .typeDetails(sensorType.getTypeDetails())
                           .build())
                   .collect(Collectors.toList());
       }
       return Collections.emptyList();
    }
}
