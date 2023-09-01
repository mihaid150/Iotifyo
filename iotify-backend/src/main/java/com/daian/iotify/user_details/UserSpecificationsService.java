package com.daian.iotify.user_details;

import com.daian.iotify.config.JWTService;
import com.daian.iotify.user.User;
import com.daian.iotify.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserSpecificationsService {
    private final UserRepository userRepository;
    private final JWTService jwtService;
    private final UserDetailsService userDetailsService;

    public UserSpecificationsResponse getUserSpecifications(String token){
        UserDetails userDetails = userDetailsService.loadUserByUsername(jwtService.extractUsername(token));
        if(jwtService.isTokenValid(token, userDetails)){
            Optional<User> optionalUser = userRepository.findByEmail(jwtService.extractUsername(token));
            if(optionalUser.isPresent()) {
                User user = optionalUser.get();
                return UserSpecificationsResponse
                        .builder()
                        .email(user.getEmail())
                        .firstname(user.getFirstname())
                        .lastname(user.getLastname())
                        .build();
            }
        }
        return UserSpecificationsResponse
                .builder()
                .email(null)
                .firstname(null)
                .lastname(null)
                .build();
    }

    public void updateUserSpecifications(UserSpecificationsRequest request, String token) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(jwtService.extractUsername(token));
        if(jwtService.isTokenValid(token, userDetails)) {
            Optional<User> optionalUser = userRepository.findByEmail(jwtService.extractUsername(token));
            if(optionalUser.isPresent()) {
                User user = optionalUser.get();
                user.setFirstname(request.getFirstname());
                user.setLastname(request.getLastname());
                userRepository.save(user);
            }
        }
    }
}
