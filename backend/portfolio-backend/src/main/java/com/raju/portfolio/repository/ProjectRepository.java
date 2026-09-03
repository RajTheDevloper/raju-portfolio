package com.raju.portfolio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.raju.portfolio.entity.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {

}