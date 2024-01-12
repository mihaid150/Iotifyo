package com.daian.iotify.sensor_controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/iotify/sensor")
@CrossOrigin(origins = {"http://192.168.0.101:3000", "http://mihaiddomain150.go.ro:3000", "http://localhost:3000", "http://192.168.4.1:3000"})
public class SensorController {
    private final SensorService sensorService;

    public SensorController(SensorService sensorService) {
        this.sensorService = sensorService;
    }

    @PostMapping("/save")
    public ResponseEntity<Void> saveSensorModel(@RequestBody SensorRequest request, @RequestHeader("Authorization")String token){
        sensorService.saveSensor(request, token);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/get")
    public ResponseEntity<List<SensorResponse>> getSensors(@RequestHeader("Authorization")String token){
        return ResponseEntity.ok(sensorService.getSensors(token));
    }

    @GetMapping("/{sensorName}/get-type")
    public ResponseEntity<List<String>> getSensorType(@PathVariable String sensorName, @RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(sensorService.getSensorType(sensorName, token));
    }
}
