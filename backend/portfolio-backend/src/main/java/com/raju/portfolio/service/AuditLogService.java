package com.raju.portfolio.service;

import java.time.LocalDateTime;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.raju.portfolio.entity.AuditLog;
import com.raju.portfolio.enums.AuditAction;
import com.raju.portfolio.repository.AuditLogRepository;

@Service
public class AuditLogService {

    private final AuditLogRepository auditLogRepository;

    public AuditLogService(
            AuditLogRepository auditLogRepository) {

        this.auditLogRepository = auditLogRepository;
    }

    public void log(
            AuditAction action,
            String contentType,
            Long contentId,
            String description) {

        AuditLog auditLog = new AuditLog();

        auditLog.setAction(action);
        auditLog.setContentType(contentType);
        auditLog.setContentId(contentId);
        auditLog.setUsername(getCurrentUsername());
        auditLog.setCreatedAt(LocalDateTime.now());
        auditLog.setDescription(description);

        auditLogRepository.save(auditLog);
    }

    private String getCurrentUsername() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        if (authentication == null ||
                !authentication.isAuthenticated()) {

            return "SYSTEM";
        }

        return authentication.getName();
    }
}