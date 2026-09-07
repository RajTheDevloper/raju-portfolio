package com.raju.portfolio.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import com.raju.portfolio.dto.LoginRequest;
import com.raju.portfolio.dto.LoginResponse;
import com.raju.portfolio.service.AuthenticationService;

@RestController
@RequestMapping("/api/auth")
@Validated
public class AuthController {

    private final AuthenticationService authenticationService;

    public AuthController(
            AuthenticationService authenticationService) {

        this.authenticationService = authenticationService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest request) {

        LoginResponse response =
                authenticationService.login(request);

        return ResponseEntity.ok(response);
    }
}