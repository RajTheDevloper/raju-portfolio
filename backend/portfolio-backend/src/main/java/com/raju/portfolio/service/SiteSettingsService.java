package com.raju.portfolio.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.raju.portfolio.dto.SiteSettingsRequest;
import com.raju.portfolio.dto.SiteSettingsResponse;
import com.raju.portfolio.entity.SiteSettings;
import com.raju.portfolio.mapper.SiteSettingsMapper;
import com.raju.portfolio.repository.SiteSettingsRepository;

@Service
public class SiteSettingsService {

    private final SiteSettingsRepository siteSettingsRepository;
    private final SiteSettingsMapper siteSettingsMapper;

    public SiteSettingsService(
            SiteSettingsRepository siteSettingsRepository,
            SiteSettingsMapper siteSettingsMapper) {

        this.siteSettingsRepository =
                siteSettingsRepository;

        this.siteSettingsMapper =
                siteSettingsMapper;
    }

    @Transactional(readOnly = true)
    public SiteSettingsResponse getSettings() {

        SiteSettings settings =
                siteSettingsRepository
                        .findTopByOrderByIdAsc()
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Site settings not configured"
                                )
                        );

        return siteSettingsMapper.toResponse(settings);
    }

    @Transactional
    public SiteSettingsResponse updateSettings(
            SiteSettingsRequest request) {

        SiteSettings settings =
                siteSettingsRepository
                        .findTopByOrderByIdAsc()
                        .orElseGet(
                                SiteSettings::new
                        );

        siteSettingsMapper.updateEntity(
                settings,
                request
        );

        SiteSettings savedSettings =
                siteSettingsRepository.save(settings);

        return siteSettingsMapper.toResponse(
                savedSettings
        );
    }
}
