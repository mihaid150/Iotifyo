package com.daian.iotify.controller_controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/iotify/controller")
@CrossOrigin(origins = {"http://192.168.0.101:3000", "http://mihaiddomain150.go.ro:3000", "http://localhost:3000"})
public class ControllerDeviceController {
    // use a service for controller for future here

    private boolean relayState = false;

    @GetMapping("/relay/get-state")
    public Map<String, Boolean> getRelayState() {
        return Collections.singletonMap("value", relayState);
    }

    @PostMapping("/relay/change-state/{newState}")
    public ResponseEntity<Void> changeRelayState(@PathVariable String newState) {
        if(newState.equals("true")){
            relayState = true;
        } else{
            relayState = false;
        }
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
