package com.raju.portfolio.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.raju.portfolio.entity.ContentRevision;
import com.raju.portfolio.service.ContentRevisionService;

@RestController
@RequestMapping("/api/admin/revisions")
public class AdminContentRevisionController {

    private final ContentRevisionService
            contentRevisionService;

    public AdminContentRevisionController(
            ContentRevisionService contentRevisionService) {

        this.contentRevisionService =
                contentRevisionService;
    }

    @GetMapping
    public ResponseEntity<List<ContentRevision>>
            getRevisionHistory(
                    @RequestParam String contentType,
                    @RequestParam Long contentId) {

        return ResponseEntity.ok(
                contentRevisionService
                        .getRevisionHistory(
                                contentType,
                                contentId
                        )
        );
    }
}