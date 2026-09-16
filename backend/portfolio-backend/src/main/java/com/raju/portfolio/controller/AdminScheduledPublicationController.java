package com.raju.portfolio.controller;

import com.raju.portfolio.dto.schedule.SchedulePublicationRequest;
import com.raju.portfolio.dto.schedule.ScheduledPublicationResponse;
import com.raju.portfolio.service.ScheduledPublicationService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/scheduled-publications")
public class AdminScheduledPublicationController {

    private final ScheduledPublicationService
            scheduledPublicationService;

    public AdminScheduledPublicationController(
            ScheduledPublicationService scheduledPublicationService) {

        this.scheduledPublicationService =
                scheduledPublicationService;
    }

    @PostMapping("/{contentType}/{contentId}")
    public ResponseEntity<ScheduledPublicationResponse> schedule(
            @PathVariable String contentType,
            @PathVariable Long contentId,
            @Valid @RequestBody SchedulePublicationRequest request,
            Authentication authentication) {

        ScheduledPublicationResponse response =
                scheduledPublicationService.schedule(
                        contentType.toUpperCase(),
                        contentId,
                        request,
                        authentication.getName()
                );

        return ResponseEntity
                .status(201)
                .body(response);
    }

    @GetMapping
    public ResponseEntity<List<ScheduledPublicationResponse>> getAll() {

        return ResponseEntity.ok(
                scheduledPublicationService.getAll()
        );
    }
}