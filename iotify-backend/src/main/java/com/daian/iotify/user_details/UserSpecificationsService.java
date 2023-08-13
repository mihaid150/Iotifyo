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
            Optional<User> user = userRepository.findByEmail(jwtService.extractUsername(token));
            return UserSpecificationsResponse
                    .builder()
                    .email(user.get().getEmail())
                    .firstname(user.get().getFirstname())
                    .lastname(user.get().getLastname())
                    .build();
        }
        return UserSpecificationsResponse
                .builder()
                .email(null)
                .firstname(null)
                .lastname(null)
                .build();
    }
}
