package com.daian.iotify.controller_controller;

import com.daian.iotify.config.JWTService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ControllerDeviceService {
    private boolean relayState = false;

    private final JWTService jwtService;
    private final UserDetailsService userDetailsService;

    public String getRelayState(String token) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(jwtService.extractUsername(token));
        if(jwtService.isTokenValid(token, userDetails)) {
            return relayState ? "true" : "false";
        }
        return "false";
    }

    public void changeRelayState(String newState) {
        relayState = "true".equals(newState);
    }

}
