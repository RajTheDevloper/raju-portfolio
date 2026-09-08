package com.raju.portfolio.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.raju.portfolio.entity.ContentStatus;
import com.raju.portfolio.entity.Skill;

public interface SkillRepository
        extends JpaRepository<Skill, Long> {

    Optional<Skill> findBySlug(String slug);

    boolean existsBySlug(String slug);

    boolean existsBySlugAndIdNot(
            String slug,
            Long id);

    List<Skill> findAllByOrderByDisplayOrderAsc();

    List<Skill> findAllByStatusOrderByDisplayOrderAsc(
    		ContentStatus status);

    List<Skill> findAllByStatusAndFeaturedTrueOrderByDisplayOrderAsc(
    		ContentStatus status);
}