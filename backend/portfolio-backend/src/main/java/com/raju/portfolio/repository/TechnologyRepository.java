package com.raju.portfolio.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.raju.portfolio.entity.Technology;

public interface TechnologyRepository
        extends JpaRepository<Technology, Long> {

    Optional<Technology> findBySlug(String slug);

    boolean existsBySlug(String slug);
    
    boolean existsBySlugAndIdNot(String slug, Long id);
}