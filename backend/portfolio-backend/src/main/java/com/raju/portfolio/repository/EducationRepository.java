package com.raju.portfolio.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.raju.portfolio.entity.Education;
import com.raju.portfolio.entity.ProjectStatus;

public interface EducationRepository
        extends JpaRepository<Education, Long> {

    List<Education> findAllByOrderByDisplayOrderAsc();

    List<Education> findAllByStatusOrderByDisplayOrderAsc(
            ProjectStatus status);

    Optional<Education> findByIdAndStatus(
            Long id,
            ProjectStatus status);
}