package com.daian.iotify.user_details;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/iotify/user_specs")
@CrossOrigin(origins = {"http://192.168.0.101:3000", "http://mihaiddomain150.go.ro:3000", "http://localhost:3000", "http://192.168.4.1:3000"})
public class UserSpecificationsController {
    private final UserSpecificationsService userSpecificationsService;
    public UserSpecificationsController(UserSpecificationsService userSpecificationsService) {
        this.userSpecificationsService = userSpecificationsService;
    }

    @GetMapping("/get")
    public ResponseEntity<UserSpecificationsResponse> getUserSpecifications(@RequestHeader("Authorization")String token){
        return ResponseEntity.ok(userSpecificationsService.getUserSpecifications(token));
    }

    @PostMapping("/update")
    public ResponseEntity<Void> updateUserSpecifications(@RequestBody UserSpecificationsRequest request, @RequestHeader("Authorization")String token) {
        userSpecificationsService.updateUserSpecifications(request, token);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
