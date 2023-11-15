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

import java.util.Collections;
import java.util.List;
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

    public List<AccountResponse> getAllAccounts(String token) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(jwtService.extractUsername(token));
        if(jwtService.isTokenValid(token, userDetails)) {
            List<User> users = userRepository.findAll();
            return users
                    .stream()
                    .map(user -> AccountResponse
                            .builder()
                            .firstName(user.getFirstname())
                            .lastName(user.getLastname())
                            .email(user.getEmail())
                            .role(user.getRole())
                            .profileImageName(accountRepository.findAccountByUser(user)
                                    .map(Account::getProfileImageName)
                                    .orElse("none"))
                            .isAccountActivated(accountRepository.findAccountByUser(user)
                                    .map(Account::getIsAccountActivated)
                                    .orElse(false))
                            .build()

                    )
                    .toList();
        }
        return Collections.emptyList();
    }

    public  void activateAccount(String username) {
       Optional<User> optionalUser = userRepository.findByEmail(username);
       if (optionalUser.isPresent()) {
           User user = optionalUser.get();
           Optional<Account> optionalAccount = accountRepository.findAccountByUser(user);
           if(optionalAccount.isPresent()) {
               Account account = optionalAccount.get();
               account.setIsAccountActivated(true);
               accountRepository.save(account);
           }
       }
    }

    public void deactivateAccount(String username){
        Optional<User> optionalUser = userRepository.findByEmail(username);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            Optional<Account> optionalAccount = accountRepository.findAccountByUser(user);
            if(optionalAccount.isPresent()) {
                Account account = optionalAccount.get();
                account.setIsAccountActivated(false);
                accountRepository.save(account);
            }
        }
    }
}
