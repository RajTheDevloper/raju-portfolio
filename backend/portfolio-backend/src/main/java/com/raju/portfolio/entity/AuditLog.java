package com.raju.portfolio.entity;


import java.time.LocalDateTime;

import com.raju.portfolio.enums.AuditAction;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "audit_log")
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private AuditAction action;

    @Column(nullable = false, length = 50)
    private String contentType;

    @Column(nullable = false)
    private Long contentId;

    @Column(length = 100)
    private String username;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(length = 500)
    private String description;

    public AuditLog() {
    }

    public Long getId() {
        return id;
    }

    public AuditAction getAction() {
        return action;
    }

    public String getContentType() {
        return contentType;
    }

    public Long getContentId() {
        return contentId;
    }

    public String getUsername() {
        return username;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public String getDescription() {
        return description;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setAction(AuditAction action) {
        this.action = action;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public void setContentId(Long contentId) {
        this.contentId = contentId;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}