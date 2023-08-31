package com.daian.iotify.account_controller;

import com.daian.iotify.account.Account;
import com.daian.iotify.account.AccountRepository;
import com.daian.iotify.auth.AuthenticationRequest;
import com.daian.iotify.auth.AuthenticationResponse;
import com.daian.iotify.config.JWTService;
import com.daian.iotify.user.User;
import com.daian.iotify.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final UserRepository userRepository;
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final JWTService jwtService;
    private final UserDetailsService userDetailsService;

    public AuthenticationResponse confirmation(AuthenticationRequest request) {
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        if(passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            Optional<Account> optionalAccount = accountRepository.findAccountByUser(user);
            if(optionalAccount.isPresent()) {
                Account account = optionalAccount.get();
                account.setIsAccountActivated(true);
                accountRepository.save(account);
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
    public void saveProfileImageName(String token, String imageName) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(jwtService.extractUsername(token));
        if(jwtService.isTokenValid(token, userDetails)) {
            Optional<User> optionalUser = userRepository.findByEmail(jwtService.extractUsername(token));
            if(optionalUser.isPresent()) {
                User user = optionalUser.get();
                Optional<Account> optionalAccount = accountRepository.findAccountByUser(user);
                if(optionalAccount.isPresent()) {
                    Account account = optionalAccount.get();
                    account.setProfileImageName(imageName);
                    accountRepository.save(account);
                }
            }
        }
    }

    public String getProfileImageName(String token) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(jwtService.extractUsername(token));
        if(jwtService.isTokenValid(token, userDetails)) {
            Optional<User> optionalUser = userRepository.findByEmail(jwtService.extractUsername(token));
            if(optionalUser.isPresent()) {
                User user = optionalUser.get();
                Optional<Account> optionalAccount = accountRepository.findAccountByUser(user);
                if(optionalAccount.isPresent()) {
                    Account account = optionalAccount.get();
                    return account.getProfileImageName();
                }
            }
        }
        return null;
    }
}
