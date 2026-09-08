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

import com.raju.portfolio.dto.SkillRequest;
import com.raju.portfolio.dto.SkillResponse;
import com.raju.portfolio.service.SkillService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/admin/skills")
public class AdminSkillController {

    private final SkillService skillService;

    public AdminSkillController(
            SkillService skillService) {

        this.skillService = skillService;
    }

    @GetMapping
    public ResponseEntity<List<SkillResponse>>
            getAllSkills() {

        return ResponseEntity.ok(
                skillService.getAllSkills()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<SkillResponse>
            getSkillById(
                    @PathVariable Long id) {

        return ResponseEntity.ok(
                skillService.getSkillById(id)
        );
    }

    @GetMapping("/by-slug/{slug}")
    public ResponseEntity<SkillResponse>
            getSkillBySlug(
                    @PathVariable String slug) {

        return ResponseEntity.ok(
                skillService.getSkillBySlug(slug)
        );
    }

    @PostMapping
    public ResponseEntity<SkillResponse>
            createSkill(
                    @Valid
                    @RequestBody
                    SkillRequest request) {

        SkillResponse response =
                skillService.createSkill(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SkillResponse>
            updateSkill(
                    @PathVariable Long id,
                    @Valid
                    @RequestBody
                    SkillRequest request) {

        return ResponseEntity.ok(
                skillService.updateSkill(
                        id,
                        request
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void>
            deleteSkill(
                    @PathVariable Long id) {

        skillService.deleteSkill(id);

        return ResponseEntity
                .noContent()
                .build();
    }

    @PostMapping("/{id}/publish")
    public ResponseEntity<SkillResponse>
            publishSkill(
                    @PathVariable Long id) {

        return ResponseEntity.ok(
                skillService.publishSkill(id)
        );
    }

    @PostMapping("/{id}/unpublish")
    public ResponseEntity<SkillResponse>
            unpublishSkill(
                    @PathVariable Long id) {

        return ResponseEntity.ok(
                skillService.unpublishSkill(id)
        );
    }

    @PostMapping("/{id}/archive")
    public ResponseEntity<SkillResponse>
            archiveSkill(
                    @PathVariable Long id) {

        return ResponseEntity.ok(
                skillService.archiveSkill(id)
        );
    }
}