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

import com.raju.portfolio.dto.TechnologyRequest;
import com.raju.portfolio.dto.TechnologyResponse;
import com.raju.portfolio.service.TechnologyService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/admin/technologies")
public class AdminTechnologyController {

    private final TechnologyService technologyService;

    public AdminTechnologyController(
            TechnologyService technologyService) {

        this.technologyService = technologyService;
    }

    @GetMapping
    public ResponseEntity<List<TechnologyResponse>> getAllTechnologies() {

        return ResponseEntity.ok(
                technologyService.getAllTechnologies()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<TechnologyResponse> getTechnologyById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                technologyService.getTechnologyById(id)
        );
    }

    @GetMapping("/by-slug/{slug}")
    public ResponseEntity<TechnologyResponse> getTechnologyBySlug(
            @PathVariable String slug) {

        return ResponseEntity.ok(
                technologyService.getTechnologyBySlug(slug)
        );
    }

    @PostMapping
    public ResponseEntity<TechnologyResponse> createTechnology(
            @Valid @RequestBody TechnologyRequest request) {

        TechnologyResponse response =
                technologyService.saveTechnology(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TechnologyResponse> updateTechnology(
            @PathVariable Long id,
            @Valid @RequestBody TechnologyRequest request) {

        return ResponseEntity.ok(
                technologyService.updateTechnology(id, request)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTechnology(
            @PathVariable Long id) {

        technologyService.deleteTechnology(id);

        return ResponseEntity.noContent().build();
    }
}