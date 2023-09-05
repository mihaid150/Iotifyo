package com.daian.iotify.account_controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/iotify/account")
@CrossOrigin(origins = {"http://192.168.0.101:3000", "http://mihaiddomain150.go.ro:3000", "http://localhost:3000"})
@RequiredArgsConstructor
public class AccountController {
    private AccountService accountService;

    @Autowired
    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping("/save-profile-image-name")
    public ResponseEntity<Void> saveProfileImageName(@RequestBody String profileImageName, @RequestHeader("Authorization") String token) {
        accountService.saveProfileImageName(token, profileImageName);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/get-profile-image-name")
    public ResponseEntity<String> getProfileImageName(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(accountService.getProfileImageName(token));
    }
}
