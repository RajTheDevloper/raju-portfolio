package com.raju.portfolio.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.raju.portfolio.dto.TechnologyResponse;
import com.raju.portfolio.service.TechnologyService;

@RestController
@RequestMapping("/api/public/technologies")
public class PublicTechnologyController {

    private final TechnologyService technologyService;

    public PublicTechnologyController(
            TechnologyService technologyService) {

        this.technologyService = technologyService;
    }

    @GetMapping
    public ResponseEntity<List<TechnologyResponse>> getTechnologies() {

        return ResponseEntity.ok(
                technologyService.getAllTechnologies()
        );
    }
}