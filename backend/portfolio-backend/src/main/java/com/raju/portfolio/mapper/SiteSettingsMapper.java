package com.raju.portfolio.mapper;

import org.springframework.stereotype.Component;

import com.raju.portfolio.dto.SiteSettingsRequest;
import com.raju.portfolio.dto.SiteSettingsResponse;
import com.raju.portfolio.entity.SiteSettings;

@Component
public class SiteSettingsMapper {

    public SiteSettings toEntity(
            SiteSettingsRequest request) {

        SiteSettings settings = new SiteSettings();

        updateEntity(settings, request);

        return settings;
    }

    public void updateEntity(
            SiteSettings settings,
            SiteSettingsRequest request) {

        settings.setSiteName(request.getSiteName());
        settings.setTagline(request.getTagline());
        settings.setSiteDescription(request.getSiteDescription());
        settings.setContactEmail(request.getContactEmail());
        settings.setGithubUrl(request.getGithubUrl());
        settings.setLinkedinUrl(request.getLinkedinUrl());
        settings.setTwitterUrl(request.getTwitterUrl());
        settings.setFooterText(request.getFooterText());
        settings.setSeoTitle(request.getSeoTitle());
        settings.setSeoDescription(request.getSeoDescription());
        settings.setMaintenanceMode(request.isMaintenanceMode());
    }

    public SiteSettingsResponse toResponse(
            SiteSettings settings) {

        SiteSettingsResponse response =
                new SiteSettingsResponse();

        response.setId(settings.getId());
        response.setSiteName(settings.getSiteName());
        response.setTagline(settings.getTagline());
        response.setSiteDescription(settings.getSiteDescription());
        response.setContactEmail(settings.getContactEmail());
        response.setGithubUrl(settings.getGithubUrl());
        response.setLinkedinUrl(settings.getLinkedinUrl());
        response.setTwitterUrl(settings.getTwitterUrl());
        response.setFooterText(settings.getFooterText());
        response.setSeoTitle(settings.getSeoTitle());
        response.setSeoDescription(settings.getSeoDescription());
        response.setMaintenanceMode(
                settings.isMaintenanceMode()
        );

        return response;
    }
}
