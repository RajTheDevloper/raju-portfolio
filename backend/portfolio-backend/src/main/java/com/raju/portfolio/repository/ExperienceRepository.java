package com.raju.portfolio.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.raju.portfolio.entity.ContentStatus;
import com.raju.portfolio.entity.Experience;

public interface ExperienceRepository
        extends JpaRepository<Experience, Long> {

    List<Experience> findAllByOrderByDisplayOrderAsc();

    List<Experience> findAllByStatusOrderByDisplayOrderAsc(
            ContentStatus status);

    Optional<Experience> findByIdAndStatus(
            Long id,
            ContentStatus status);
}