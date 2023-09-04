package com.daian.iotify.user_controller;

import com.daian.iotify.config.JWTService;
import com.daian.iotify.user.User;
import com.daian.iotify.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final JWTService jwtService;
    private final UserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;

    public String getUserEmail(String token) {
        User user = getUser(token);
        if(user != null) {
            return user.getEmail();
        } else {
            return null;
        }
    }
    public Boolean checkIfTypedPasswordMatches(UserRequest request, String token) {

        User user = getUser(token);
        if(user != null) {
            String storedPassword = user.getPassword();
            return passwordEncoder.matches(request.getCredential(), storedPassword);
        } else {
            return false;
        }
    }
    public void updateUserEmail(UserRequest request, String token) {
        User user = getUser(token);
        if(user != null) {
            user.setEmail(request.getCredential());
            userRepository.save(user);
        }
    }

    public void updateUserPassword(UserRequest request, String token) {
        User user = getUser(token);
        if(user != null) {
            user.setPassword(passwordEncoder.encode(request.getCredential()));
            userRepository.save(user);
        }
    }

    public void deleteUser(String token) {
        User user = getUser(token);
        if(user != null) {
            userRepository.delete(user);
        }
    }

    private User getUser(String token) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(jwtService.extractUsername(token));
        if(jwtService.isTokenValid(token, userDetails)) {
            Optional<User> optionalUser = userRepository.findByEmail(jwtService.extractUsername(token));
            if(optionalUser.isPresent()) {
                return optionalUser.get();
            }
        }
        return null;
    }
}
