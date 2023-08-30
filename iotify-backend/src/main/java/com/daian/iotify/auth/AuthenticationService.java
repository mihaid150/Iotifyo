package com.daian.iotify.auth;

import com.daian.iotify.config.JWTService;
import com.daian.iotify.mail.MailRequest;
import com.daian.iotify.mail.MailService;
import com.daian.iotify.user.Role;
import com.daian.iotify.user.User;
import com.daian.iotify.user.UserRepository;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.*;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JWTService jwtService;
    private final MailService mailService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) throws IOException, MessagingException {
        ClassPathResource resource = new ClassPathResource("html/account_registration_confirmation.html");
        try (InputStream inputStream = resource.getInputStream()) {
            String htmlContent = new String(inputStream.readAllBytes());
            User user = User.builder()
                    .firstname(request.getFirstname())
                    .lastname(request.getLastname())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .role(Role.USER)
                    .build();
            htmlContent = htmlContent.replace("{{firstname}}", user.getFirstname());
            htmlContent = htmlContent.replace("{{lastname}}", user.getLastname());
            MailRequest mailRequest = new MailRequest(false, request.getEmail(), "New Account Confirmation", htmlContent);
            userRepository.save(user);
            String jwtToken = jwtService.generateToken(user);
            mailService.send(mailRequest, "/static/images/mail-background-image.png", jwtToken);
            return AuthenticationResponse
                    .builder()
                    .token(jwtToken)
                    .build();
        }
    }
    public AuthenticationResponse authenticate(AuthenticationRequest request){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        String jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse
                .builder()
                .token(jwtToken)
                .build();
    }

}
