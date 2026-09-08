package com.raju.portfolio.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.raju.portfolio.dto.SkillResponse;
import com.raju.portfolio.service.SkillService;

@RestController
@RequestMapping("/api/public/skills")
public class PublicSkillController {

    private final SkillService skillService;

    public PublicSkillController(
            SkillService skillService) {

        this.skillService = skillService;
    }

    @GetMapping
    public ResponseEntity<List<SkillResponse>>
            getPublishedSkills() {

        return ResponseEntity.ok(
                skillService.getPublishedSkills()
        );
    }

    @GetMapping("/featured")
    public ResponseEntity<List<SkillResponse>>
            getFeaturedSkills() {

        return ResponseEntity.ok(
                skillService.getFeaturedSkills()
        );
    }

    @GetMapping("/{slug}")
    public ResponseEntity<SkillResponse>
            getPublishedSkillBySlug(
                    @PathVariable String slug) {

        return ResponseEntity.ok(
                skillService
                        .getPublishedSkillBySlug(slug)
        );
    }
}