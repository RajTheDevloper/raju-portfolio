package com.raju.portfolio.controller;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.raju.portfolio.dto.ProjectRequest;
import com.raju.portfolio.dto.ProjectResponse;
import com.raju.portfolio.dto.common.PageResponse;
import com.raju.portfolio.entity.ContentStatus;
import com.raju.portfolio.service.ContentRevisionService;
import com.raju.portfolio.service.ProjectService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/admin/projects")
public class AdminProjectController {

    private final ProjectService projectService;
    
    private final ContentRevisionService contentRevisionService;

    public AdminProjectController(
            ProjectService projectService,
            ContentRevisionService contentRevisionService) {

        this.projectService = projectService;
        this.contentRevisionService = contentRevisionService;
    }

    @GetMapping
    public ResponseEntity<List<ProjectResponse>> getAllProjects() {

        return ResponseEntity.ok(
                projectService.getAllProjects()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectResponse> getProjectById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                projectService.getProjectById(id)
        );
    }

    @GetMapping("/by-slug/{slug}")
    public ResponseEntity<ProjectResponse> getProjectBySlug(
            @PathVariable String slug) {

        return ResponseEntity.ok(
                projectService.getProjectBySlug(slug)
        );
    }

    @PostMapping
    public ResponseEntity<ProjectResponse> createProject(
            @Valid @RequestBody ProjectRequest request) {

        ProjectResponse response =
                projectService.saveProject(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjectResponse> updateProject(
            @PathVariable Long id,
            @Valid @RequestBody ProjectRequest request) {

        return ResponseEntity.ok(
                projectService.updateProject(id, request)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(
            @PathVariable Long id) {

        projectService.deleteProject(id);

        return ResponseEntity.noContent().build();
    }
    
    @PostMapping("/{id}/publish")
    public ResponseEntity<ProjectResponse> publishProject(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                projectService.publishProject(id)
        );
    }
    
    @PostMapping("/{id}/archive")
    public ResponseEntity<ProjectResponse> archiveProject(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                projectService.archiveProject(id)
        );
    }
    
    @PostMapping("/{id}/unpublish")
    public ResponseEntity<ProjectResponse> unpublishProject(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                projectService.unpublishProject(id)
        );
    }
    
    @GetMapping("/{id}/preview")
    public ResponseEntity<ProjectResponse> preview(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                contentRevisionService
                        .getLatestProjectDraft(id)
        );
    }
    
    @GetMapping("/search")
    public ResponseEntity<PageResponse<ProjectResponse>> searchProjects(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) ContentStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
    	
    	
    	size = Math.min(size, 50);
    	size = Math.max(size, 1);
    	page = Math.max(page, 0);
    	
        Pageable pageable =
                PageRequest.of(
                        page,
                        size,
                        Sort.by("displayOrder").ascending()
                );

        return ResponseEntity.ok(
                projectService.searchProjects(
                        search,
                        status,
                        pageable
                )
        );
    }
    
}