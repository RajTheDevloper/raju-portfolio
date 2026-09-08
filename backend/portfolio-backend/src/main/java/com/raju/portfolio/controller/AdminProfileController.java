package com.raju.portfolio.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.raju.portfolio.dto.ProfileRequest;
import com.raju.portfolio.dto.ProfileResponse;
import com.raju.portfolio.service.ProfileService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/admin/profile")
public class AdminProfileController {

    private final ProfileService profileService;

    public AdminProfileController(
            ProfileService profileService) {

        this.profileService = profileService;
    }

    @GetMapping
    public ResponseEntity<ProfileResponse> getProfile() {

        return ResponseEntity.ok(
                profileService.getProfile()
        );
    }

    @PutMapping
    public ResponseEntity<ProfileResponse> updateProfile(
            @Valid @RequestBody ProfileRequest request) {

        return ResponseEntity.ok(
                profileService.updateProfile(request)
        );
    }
}