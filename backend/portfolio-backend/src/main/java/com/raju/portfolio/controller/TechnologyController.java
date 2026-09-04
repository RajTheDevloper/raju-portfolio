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
@RequestMapping("/api/technologies")
public class TechnologyController {

    private final TechnologyService technologyService;

    public TechnologyController(
            TechnologyService technologyService) {

        this.technologyService = technologyService;
    }

    @GetMapping
    public ResponseEntity<List<TechnologyResponse>>
            getAllTechnologies() {

        List<TechnologyResponse> technologies =
                technologyService.getAllTechnologies();

        return ResponseEntity.ok(technologies);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TechnologyResponse>
            getTechnologyById(
                    @PathVariable Long id) {

        TechnologyResponse technology =
                technologyService.getTechnologyById(id);

        return ResponseEntity.ok(technology);
    }

    @GetMapping("/by-slug/{slug}")
    public ResponseEntity<TechnologyResponse>
            getTechnologyBySlug(
                    @PathVariable String slug) {

        TechnologyResponse technology =
                technologyService.getTechnologyBySlug(slug);

        return ResponseEntity.ok(technology);
    }

    @PostMapping
    public ResponseEntity<TechnologyResponse>
            createTechnology(
                    @RequestBody @Valid TechnologyRequest request) {

        TechnologyResponse savedTechnology =
                technologyService.saveTechnology(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedTechnology);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TechnologyResponse>
            updateTechnology(
                    @PathVariable Long id,
                    @RequestBody @Valid TechnologyRequest request) {

        TechnologyResponse updatedTechnology =
                technologyService.updateTechnology(
                        id,
                        request
                );

        return ResponseEntity.ok(updatedTechnology);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTechnology(
            @PathVariable Long id) {

        technologyService.deleteTechnology(id);

        return ResponseEntity
                .noContent()
                .build();
    }
}