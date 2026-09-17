package com.raju.portfolio.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
public class HealthController {

    @GetMapping("/api/health")
    public ResponseEntity<Map<String, Object>> health() {

        Map<String, Object> response = Map.of(
                "status", "UP",
                "service", "portfolio-backend",
                "timestamp", LocalDateTime.now()
        );

        return ResponseEntity.ok(response);
    }
}