package com.raju.portfolio.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.raju.portfolio.dto.EducationResponse;
import com.raju.portfolio.service.EducationService;

@RestController
@RequestMapping("/api/public/educations")
public class PublicEducationController {

    private final EducationService educationService;

    public PublicEducationController(
            EducationService educationService) {

        this.educationService = educationService;
    }

    @GetMapping
    public ResponseEntity<List<EducationResponse>>
            getPublishedEducations() {

        return ResponseEntity.ok(
                educationService
                        .getPublishedEducations()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<EducationResponse>
            getPublishedEducationById(
                    @PathVariable Long id) {

        return ResponseEntity.ok(
                educationService
                        .getPublishedEducationById(id)
        );
    }
}