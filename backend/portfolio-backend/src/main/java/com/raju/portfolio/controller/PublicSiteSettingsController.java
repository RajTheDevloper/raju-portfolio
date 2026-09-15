package com.raju.portfolio.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.raju.portfolio.dto.SiteSettingsResponse;
import com.raju.portfolio.service.SiteSettingsService;

@RestController
@RequestMapping("/api/public/settings")
public class PublicSiteSettingsController {

    private final SiteSettingsService siteSettingsService;

    public PublicSiteSettingsController(
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
}
