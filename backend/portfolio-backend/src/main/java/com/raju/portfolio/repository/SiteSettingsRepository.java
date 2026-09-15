package com.raju.portfolio.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.raju.portfolio.entity.SiteSettings;

public interface SiteSettingsRepository
        extends JpaRepository<SiteSettings, Long> {

    Optional<SiteSettings> findTopByOrderByIdAsc();
}
