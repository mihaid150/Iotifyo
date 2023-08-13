package com.daian.iotify.sensor_type_controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/iotify/sensors-types")
@CrossOrigin(origins = {"http://192.168.0.101:3000", "http://mihaiddomain150.go.ro", "http://localhost:3000"})
@RequiredArgsConstructor
public class SensorTypeController {
    @Autowired
    private final SensorTypeService sensorTypeService;

    @PostMapping("/save")
    public ResponseEntity<Void> saveSensorType(@RequestBody SensorTypeRequest request, @RequestHeader("Authorization") String token) {
        sensorTypeService.saveSensorType(request, token);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/get")
    public ResponseEntity<List<SensorTypeResponse>> getSensorsTypes(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(sensorTypeService.getSensorsType(token));
    }
}
