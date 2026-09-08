package com.raju.portfolio.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.raju.portfolio.entity.ContentStatus;
import com.raju.portfolio.entity.Education;

public interface EducationRepository
        extends JpaRepository<Education, Long> {

    List<Education> findAllByOrderByDisplayOrderAsc();

    List<Education> findAllByStatusOrderByDisplayOrderAsc(
            ContentStatus status);

    Optional<Education> findByIdAndStatus(
            Long id,
            ContentStatus status);
}