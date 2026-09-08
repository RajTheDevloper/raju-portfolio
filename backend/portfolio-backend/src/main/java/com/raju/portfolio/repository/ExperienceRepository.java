package com.raju.portfolio.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.raju.portfolio.entity.Experience;
import com.raju.portfolio.entity.ProjectStatus;

public interface ExperienceRepository
        extends JpaRepository<Experience, Long> {

    List<Experience> findAllByOrderByDisplayOrderAsc();

    List<Experience> findAllByStatusOrderByDisplayOrderAsc(
            ProjectStatus status);

    Optional<Experience> findByIdAndStatus(
            Long id,
            ProjectStatus status);
}