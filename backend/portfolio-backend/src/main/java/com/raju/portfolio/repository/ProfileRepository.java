package com.raju.portfolio.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.raju.portfolio.entity.Profile;

public interface ProfileRepository
        extends JpaRepository<Profile, Long> {

    Optional<Profile> findTopByOrderByIdAsc();
}