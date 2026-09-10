package com.raju.portfolio.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.raju.portfolio.dto.ResumeRequest;
import com.raju.portfolio.dto.ResumeResponse;
import com.raju.portfolio.service.ResumeService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/admin/resume")
@Validated
public class AdminResumeController {

    private final ResumeService resumeService;

    public AdminResumeController(
            ResumeService resumeService) {

        this.resumeService = resumeService;
    }

    @GetMapping
    public ResponseEntity<List<ResumeResponse>> getAllResumes() {

        return ResponseEntity.ok(
                resumeService.getAllResumes()
        );
    }

    @PostMapping
    public ResponseEntity<ResumeResponse> createResume(
            @Valid @RequestBody ResumeRequest request) {

        return ResponseEntity.ok(
                resumeService.createResume(request)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResumeResponse> updateResume(
            @PathVariable Long id,
            @Valid @RequestBody ResumeRequest request) {

        return ResponseEntity.ok(
                resumeService.updateResume(id, request)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResume(
            @PathVariable Long id) {

        resumeService.deleteResume(id);

        return ResponseEntity.noContent().build();
    }
}
