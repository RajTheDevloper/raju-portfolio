package com.raju.portfolio.controller;


import com.raju.portfolio.dto.auth.AdminProfileResponse;
import com.raju.portfolio.dto.auth.ChangePasswordRequest;
import com.raju.portfolio.service.AdminService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/account")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping
    public ResponseEntity<AdminProfileResponse> getProfile(
            Authentication authentication) {

        return ResponseEntity.ok(
                adminService.getProfile(
                        authentication.getName()
                )
        );
    }

    @PutMapping("/password")
    public ResponseEntity<Void> changePassword(
            Authentication authentication,
            @Valid @RequestBody ChangePasswordRequest request) {

        adminService.changePassword(
                authentication.getName(),
                request
        );

        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/enabled")
    public ResponseEntity<Void> updateEnabled(
            @PathVariable Long id,
            @RequestParam boolean enabled) {

        adminService.updateEnabled(id, enabled);

        return ResponseEntity.noContent().build();
    }
}