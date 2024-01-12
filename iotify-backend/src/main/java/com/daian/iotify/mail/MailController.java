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
@CrossOrigin(origins = {"http://192.168.0.101:3000", "http://mihaiddomain150.go.ro:3000", "http://localhost:3000", "http://192.168.4.1:3000"})
@RequiredArgsConstructor
public class MailController {
    private MailService emailService;

    @Autowired
    public MailController(MailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/send")
    public ResponseEntity<Void> sendMail(@RequestBody MailRequest request, @RequestHeader("Authorization") String token) throws MessagingException, IOException {
        emailService.send(request,null, token);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/send-attachment")
    public ResponseEntity<Void> sendMailWithAttachment(@RequestBody MailRequest request, @RequestHeader("Authorization") String token) throws MessagingException {
        emailService.sendWithAttach(request,null, null, token);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

}
