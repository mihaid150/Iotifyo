package com.daian.iotify.sensor_data_controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/iotify/{typeName}/{sensorName}")
@CrossOrigin(origins = {"http://192.168.0.101:3000", "http://mihaiddomain150.go.ro:3000", "http://localhost:3000"})
public class SensorDataController {
    private final SensorDataService sensorDataService;

    public SensorDataController(SensorDataService sensorDataService) {
        this.sensorDataService = sensorDataService;
    }

    @PostMapping("/save")
    public ResponseEntity<Void> saveSensorData(@RequestBody SensorDataRequest request, @PathVariable String typeName, @PathVariable String sensorName, @RequestHeader("Authorization") String token) {
        sensorDataService.saveSensorValue(request, sensorName, typeName, token);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/get-data/{date}")
    public ResponseEntity<List<SensorDataResponse>> getSensorData(@PathVariable String date, @PathVariable String typeName, @PathVariable String sensorName, @RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(sensorDataService.getSensorDataList(date, sensorName, typeName, token));
    }

    @GetMapping("/get-date")
    public ResponseEntity<Set<DateResponse>> getSensorDataDate(@PathVariable String typeName, @PathVariable String sensorName, @RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(sensorDataService.getDataDate(sensorName,typeName, token));
    }
}
