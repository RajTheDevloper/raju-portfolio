package com.raju.portfolio.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.raju.portfolio.dto.ExperienceRequest;
import com.raju.portfolio.dto.ExperienceResponse;
import com.raju.portfolio.service.ExperienceService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/admin/experiences")
public class AdminExperienceController {

    private final ExperienceService experienceService;

    public AdminExperienceController(
            ExperienceService experienceService) {

        this.experienceService = experienceService;
    }

    @GetMapping
    public ResponseEntity<List<ExperienceResponse>>
            getAllExperiences() {

        return ResponseEntity.ok(
                experienceService.getAllExperiences()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExperienceResponse>
            getExperienceById(
                    @PathVariable Long id) {

        return ResponseEntity.ok(
                experienceService.getExperienceById(id)
        );
    }

    @PostMapping
    public ResponseEntity<ExperienceResponse>
            createExperience(
                    @Valid
                    @RequestBody
                    ExperienceRequest request) {

        ExperienceResponse response =
                experienceService.createExperience(
                        request
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExperienceResponse>
            updateExperience(
                    @PathVariable Long id,
                    @Valid
                    @RequestBody
                    ExperienceRequest request) {

        return ResponseEntity.ok(
                experienceService.updateExperience(
                        id,
                        request
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void>
            deleteExperience(
                    @PathVariable Long id) {

        experienceService.deleteExperience(id);

        return ResponseEntity
                .noContent()
                .build();
    }
}