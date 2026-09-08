package com.raju.portfolio.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.raju.portfolio.dto.ProfileResponse;
import com.raju.portfolio.service.ProfileService;

@RestController
@RequestMapping("/api/public/profile")
public class PublicProfileController {

    private final ProfileService profileService;

    public PublicProfileController(
            ProfileService profileService) {

        this.profileService = profileService;
    }

    @GetMapping
    public ResponseEntity<ProfileResponse> getProfile() {

        return ResponseEntity.ok(
                profileService.getProfile()
        );
    }
}