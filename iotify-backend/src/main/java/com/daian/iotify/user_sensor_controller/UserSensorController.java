package com.daian.iotify.user_sensor_controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/iotify/user-sensor")
@CrossOrigin(origins = {"http://192.168.0.101:3000", "http://mihaiddomain150.go.ro:3000", "http://localhost:3000", "http://192.168.4.1:3000"})
public class UserSensorController {
    private final UserSensorService userSensorService;

    public UserSensorController(UserSensorService userSensorService) {
        this.userSensorService = userSensorService;
    }

    @PostMapping("/save")
    public ResponseEntity<Void> postUserSensor(@RequestBody UserSensorRequest request, @RequestHeader("Authorization")String token){
        userSensorService.saveUserSensor(request, token);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/get")
    public ResponseEntity<List<UserSensorResponse>> getUserSensor(@RequestHeader("Authorization")String token){
        return ResponseEntity.ok(userSensorService.getUserSensors(token));
    }
}
