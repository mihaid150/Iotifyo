package com.daian.iotify.auth;

import com.daian.iotify.account.Account;
import com.daian.iotify.account.AccountRepository;
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
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final AccountRepository accountRepository;
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
            Account account = Account.builder()
                    .isAccountActivated(false)
                    .profileImageName(null)
                    .user(user)
                    .build();
            htmlContent = htmlContent.replace("{{firstname}}", user.getFirstname());
            htmlContent = htmlContent.replace("{{lastname}}", user.getLastname());
            MailRequest mailRequest = new MailRequest(false, request.getEmail(), "New Account Confirmation", htmlContent);
            userRepository.save(user);
            accountRepository.save(account);
            String jwtToken = jwtService.generateToken(user);
            mailService.send(mailRequest, "/static/images/mail-background-image.png", jwtToken);
            return AuthenticationResponse
                    .builder()
                    .token(jwtToken)
                    .build();
        }
    }
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        Optional<Account> optionalAccount = accountRepository.findAccountByUser(user);
        if (optionalAccount.isPresent()) {
            Account account = optionalAccount.get();
            if (Boolean.TRUE.equals(account.getIsAccountActivated())) {
                String jwtToken = jwtService.generateToken(user);
                return AuthenticationResponse
                        .builder()
                        .token(jwtToken)
                        .build();
            } else {
                return AuthenticationResponse
                        .builder()
                        .token(null)
                        .build();
            }
        } else {
            return AuthenticationResponse
                    .builder()
                    .token(null)
                    .build();
        }
    }
}
