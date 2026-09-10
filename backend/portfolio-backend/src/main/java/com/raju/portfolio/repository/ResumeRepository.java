package com.raju.portfolio.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.raju.portfolio.entity.Resume;

public interface ResumeRepository extends JpaRepository<Resume, Long> {

    Optional<Resume> findTopByActiveTrueOrderByUploadedAtDesc();

    List<Resume> findAllByOrderByUploadedAtDesc();
}
