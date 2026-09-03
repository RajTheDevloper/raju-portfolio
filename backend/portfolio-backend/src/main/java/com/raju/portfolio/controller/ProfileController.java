package com.raju.portfolio.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.raju.portfolio.dto.ProfileRequest;
import com.raju.portfolio.dto.ProfileResponse;
import com.raju.portfolio.service.ProfileService;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping
    public ResponseEntity<List<ProfileResponse>> getAllProfiles() {

        List<ProfileResponse> profiles =
                profileService.getAllProfiles();

        return ResponseEntity.ok(profiles);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProfileResponse> getProfileById(
            @PathVariable Long id) {

        ProfileResponse profile =
                profileService.getProfileById(id);

        return ResponseEntity.ok(profile);
    }

    @PostMapping
    public ResponseEntity<ProfileResponse> createProfile(
            @RequestBody ProfileRequest request) {

        ProfileResponse savedProfile =
                profileService.saveProfile(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedProfile);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProfileResponse> updateProfile(
            @PathVariable Long id,
            @RequestBody ProfileRequest request) {

        ProfileResponse updatedProfile =
                profileService.updateProfile(id, request);

        return ResponseEntity.ok(updatedProfile);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProfile(
            @PathVariable Long id) {

        profileService.deleteProfile(id);

        return ResponseEntity.noContent().build();
    }
}