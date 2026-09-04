package com.raju.portfolio.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.raju.portfolio.entity.Project;
import com.raju.portfolio.entity.ProjectStatus;

public interface ProjectRepository
        extends JpaRepository<Project, Long> {

    Optional<Project> findBySlug(String slug);

    boolean existsBySlug(String slug);

    boolean existsBySlugAndIdNot(
            String slug,
            Long id
    );

    List<Project> findAllByOrderByDisplayOrderAsc();
    
    List<Project> findAllByStatusOrderByDisplayOrderAsc(
            ProjectStatus status
    );
}