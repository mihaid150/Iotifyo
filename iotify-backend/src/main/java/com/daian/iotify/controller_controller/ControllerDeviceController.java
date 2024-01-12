package com.daian.iotify.controller_controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/iotify/controller")
@CrossOrigin(origins = {"http://192.168.0.101:3000", "http://mihaiddomain150.go.ro:3000", "http://localhost:3000", "http://192.168.4.1:3000"})
public class ControllerDeviceController {
    private final ControllerDeviceService controllerDeviceService;
    @Autowired
    public ControllerDeviceController(ControllerDeviceService controllerDeviceService) {
        this.controllerDeviceService = controllerDeviceService;
    }

    @GetMapping("/relay/get-state")
    public String getRelayState(@RequestHeader("Authorization") String token) {
        return controllerDeviceService.getRelayState(token);
    }

    @PostMapping("/relay/change-state/{newState}")
    public ResponseEntity<Void> changeRelayState(@PathVariable String newState) {
        controllerDeviceService.changeRelayState(newState);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
