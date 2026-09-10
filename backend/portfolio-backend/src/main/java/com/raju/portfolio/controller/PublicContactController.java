package com.raju.portfolio.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.raju.portfolio.dto.ContactMessageRequest;
import com.raju.portfolio.dto.ContactMessageResponse;
import com.raju.portfolio.service.ContactMessageService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/public/contact")
public class PublicContactController {

    private final ContactMessageService contactMessageService;

    public PublicContactController(
            ContactMessageService contactMessageService) {

        this.contactMessageService =
                contactMessageService;
    }

    @PostMapping
    public ResponseEntity<ContactMessageResponse> createMessage(
            @Valid @RequestBody ContactMessageRequest request) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        contactMessageService.createMessage(
                                request
                        )
                );
    }
}
