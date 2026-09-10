package com.raju.portfolio.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.raju.portfolio.dto.ResumeResponse;
import com.raju.portfolio.service.ResumeService;

@RestController
@RequestMapping("/api/public/resume")
public class PublicResumeController {

    private final ResumeService resumeService;

    public PublicResumeController(
            ResumeService resumeService) {

        this.resumeService = resumeService;
    }

    @GetMapping
    public ResponseEntity<ResumeResponse> getActiveResume() {

        return ResponseEntity.ok(
                resumeService.getActiveResume()
        );
    }
}
