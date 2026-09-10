package com.raju.portfolio.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.raju.portfolio.dto.ContactMessageResponse;
import com.raju.portfolio.entity.ContactMessageStatus;
import com.raju.portfolio.service.ContactMessageService;

@RestController
@RequestMapping("/api/admin/contact")
public class AdminContactController {

    private final ContactMessageService contactMessageService;

    public AdminContactController(
            ContactMessageService contactMessageService) {

        this.contactMessageService =
                contactMessageService;
    }

    @GetMapping
    public ResponseEntity<List<ContactMessageResponse>>
            getMessages(
                    @RequestParam(required = false)
                    ContactMessageStatus status) {

        if (status != null) {

            return ResponseEntity.ok(
                    contactMessageService
                            .getMessagesByStatus(status)
            );
        }

        return ResponseEntity.ok(
                contactMessageService.getAllMessages()
        );
    }

    @GetMapping("/unread-count")
    public ResponseEntity<Long> getUnreadCount() {

        return ResponseEntity.ok(
                contactMessageService.getUnreadCount()
        );
    }

    @PostMapping("/{id}/read")
    public ResponseEntity<ContactMessageResponse>
            markAsRead(
                    @PathVariable Long id) {

        return ResponseEntity.ok(
                contactMessageService.markAsRead(id)
        );
    }

    @PostMapping("/{id}/unread")
    public ResponseEntity<ContactMessageResponse>
            markAsUnread(
                    @PathVariable Long id) {

        return ResponseEntity.ok(
                contactMessageService.markAsUnread(id)
        );
    }

    @PostMapping("/{id}/archive")
    public ResponseEntity<ContactMessageResponse>
            archiveMessage(
                    @PathVariable Long id) {

        return ResponseEntity.ok(
                contactMessageService.archiveMessage(id)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMessage(
            @PathVariable Long id) {

        contactMessageService.deleteMessage(id);

        return ResponseEntity.noContent().build();
    }
}
