package com.raju.portfolio.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.raju.portfolio.dto.ExperienceResponse;
import com.raju.portfolio.service.ExperienceService;

@RestController
@RequestMapping("/api/public/experiences")
public class PublicExperienceController {

    private final ExperienceService experienceService;

    public PublicExperienceController(
            ExperienceService experienceService) {

        this.experienceService = experienceService;
    }

    @GetMapping
    public ResponseEntity<List<ExperienceResponse>>
            getPublishedExperiences() {

        return ResponseEntity.ok(
                experienceService
                        .getPublishedExperiences()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExperienceResponse>
            getPublishedExperienceById(
                    @PathVariable Long id) {

        return ResponseEntity.ok(
                experienceService
                        .getPublishedExperienceById(id)
        );
    }
}