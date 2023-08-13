package com.daian.iotify.user_details;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/iotify/user_specs")
@CrossOrigin(origins = {"http://192.168.0.101:3000", "http://mihaiddomain150.go.ro:3000", "http://localhost:3000"})
@RequiredArgsConstructor
public class UserSpecificationsController {
    @Autowired
    private UserSpecificationsService userSpecificationsService;

    @GetMapping("/get")
    public ResponseEntity<UserSpecificationsResponse> getUserSpecifications(@RequestHeader("Authorization")String token){
        return ResponseEntity.ok(userSpecificationsService.getUserSpecifications(token));
    }
}
