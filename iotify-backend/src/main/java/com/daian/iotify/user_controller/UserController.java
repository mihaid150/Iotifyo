package com.daian.iotify.user_controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/iotify/user")
@CrossOrigin(origins = {"http://192.168.0.101:3000", "http://mihaiddomain150.go.ro:3000", "http://localhost:3000"})
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/get-email")
    public ResponseEntity<String> getUserEmail(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(userService.getUserEmail(token));
    }

    @PostMapping("/check-password")
    public ResponseEntity<Boolean> getUserPassword(@RequestBody UserRequest request,@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(userService.checkIfTypedPasswordMatches(request, token));
    }

    @PutMapping("/update-email")
    public ResponseEntity<Void> updateUserEmail(@RequestBody UserRequest request, @RequestHeader("Authorization") String token){
        userService.updateUserEmail(request, token);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/update-password")
    public ResponseEntity<Void> updateUserPassword(@RequestBody UserRequest request, @RequestHeader("Authorization") String token) {
        userService.updateUserPassword(request, token);
        return  ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/delete")
    public ResponseEntity<Void> delete(@RequestHeader("Authorization") String token) {
        userService.deleteUser(token);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/delete-by-admin")
    public ResponseEntity<Void> deleteByAdmin(@RequestBody String username) {
        userService.deleteUserByAdmin(username);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/give-staff-by-admin")
    public ResponseEntity<Void> setStaffByAdmin(@RequestBody String username) {
        userService.setStaffByAdmin(username);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/give-user-by-admin")
    public ResponseEntity<Void> setUserByAdmin(@RequestBody String username) {
        userService.setUserByAdmin(username);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
