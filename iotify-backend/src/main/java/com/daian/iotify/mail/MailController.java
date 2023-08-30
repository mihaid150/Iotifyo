package com.daian.iotify.mail;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/iotify/mail")
@CrossOrigin(origins = {"http://192.168.0.101:3000", "http://mihaiddomain150.go.ro:3000", "http://localhost:3000"})
@RequiredArgsConstructor
public class MailController {
    @Autowired
    private MailService emailService;

    @PostMapping("/send")
    public ResponseEntity<Void> sendMail(@RequestBody MailRequest request, @RequestHeader("Authorization") String token) throws MessagingException, IOException {
        emailService.send(request,null, token);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

}
