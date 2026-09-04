package com.raju.portfolio.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.raju.portfolio.dto.ProjectResponse;
import com.raju.portfolio.service.ProjectService;

@RestController
@RequestMapping("/api/public/projects")
public class PublicProjectController {

    private final ProjectService projectService;

    public PublicProjectController(
            ProjectService projectService) {

        this.projectService = projectService;
    }

    @GetMapping
    public ResponseEntity<List<ProjectResponse>>
            getPublishedProjects() {

        List<ProjectResponse> projects =
                projectService.getPublishedProjects();

        return ResponseEntity.ok(projects);
    }
}