package com.raju.portfolio.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.raju.portfolio.dto.LoginRequest;
import com.raju.portfolio.dto.LoginResponse;

@Service
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;

    public AuthenticationService(
            AuthenticationManager authenticationManager) {

        this.authenticationManager = authenticationManager;
    }

    public LoginResponse login(LoginRequest request) {

        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                request.getUsername(),
                                request.getPassword()
                        )
                );

        return new LoginResponse(
                "Login successful",
                authentication.getName(),
                authentication.getAuthorities()
                        .iterator()
                        .next()
                        .getAuthority()
        );
    }
}