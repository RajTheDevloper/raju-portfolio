package com.raju.portfolio.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.raju.portfolio.dto.SiteSettingsRequest;
import com.raju.portfolio.dto.SiteSettingsResponse;
import com.raju.portfolio.service.SiteSettingsService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/admin/settings")
@Validated
public class AdminSiteSettingsController {

    private final SiteSettingsService siteSettingsService;

    public AdminSiteSettingsController(
            SiteSettingsService siteSettingsService) {

        this.siteSettingsService =
                siteSettingsService;
    }

    @GetMapping
    public ResponseEntity<SiteSettingsResponse> getSettings() {

        return ResponseEntity.ok(
                siteSettingsService.getSettings()
        );
    }

    @PutMapping
    public ResponseEntity<SiteSettingsResponse> updateSettings(
            @Valid @RequestBody SiteSettingsRequest request) {

        return ResponseEntity.ok(
                siteSettingsService.updateSettings(
                        request
                )
        );
    }
}
