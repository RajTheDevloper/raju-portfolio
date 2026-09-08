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

import com.raju.portfolio.dto.EducationRequest;
import com.raju.portfolio.dto.EducationResponse;
import com.raju.portfolio.service.EducationService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/admin/educations")
public class AdminEducationController {

    private final EducationService educationService;

    public AdminEducationController(
            EducationService educationService) {

        this.educationService = educationService;
    }

    @GetMapping
    public ResponseEntity<List<EducationResponse>>
            getAllEducations() {

        return ResponseEntity.ok(
                educationService.getAllEducations()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<EducationResponse>
            getEducationById(
                    @PathVariable Long id) {

        return ResponseEntity.ok(
                educationService.getEducationById(id)
        );
    }

    @PostMapping
    public ResponseEntity<EducationResponse>
            createEducation(
                    @Valid
                    @RequestBody
                    EducationRequest request) {

        EducationResponse response =
                educationService.createEducation(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EducationResponse>
            updateEducation(
                    @PathVariable Long id,
                    @Valid
                    @RequestBody
                    EducationRequest request) {

        return ResponseEntity.ok(
                educationService.updateEducation(
                        id,
                        request
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void>
            deleteEducation(
                    @PathVariable Long id) {

        educationService.deleteEducation(id);

        return ResponseEntity
                .noContent()
                .build();
    }

    @PostMapping("/{id}/publish")
    public ResponseEntity<EducationResponse>
            publishEducation(
                    @PathVariable Long id) {

        return ResponseEntity.ok(
                educationService.publishEducation(id)
        );
    }

    @PostMapping("/{id}/unpublish")
    public ResponseEntity<EducationResponse>
            unpublishEducation(
                    @PathVariable Long id) {

        return ResponseEntity.ok(
                educationService.unpublishEducation(id)
        );
    }

    @PostMapping("/{id}/archive")
    public ResponseEntity<EducationResponse>
            archiveEducation(
                    @PathVariable Long id) {

        return ResponseEntity.ok(
                educationService.archiveEducation(id)
        );
    }
}