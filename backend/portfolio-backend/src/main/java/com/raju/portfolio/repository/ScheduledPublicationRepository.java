package com.raju.portfolio.repository;

import com.raju.portfolio.entity.ScheduledPublication;
import com.raju.portfolio.enums.ScheduledPublicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ScheduledPublicationRepository
        extends JpaRepository<ScheduledPublication, Long> {

    List<ScheduledPublication>
    findByStatusAndScheduledAtLessThanEqual(
            ScheduledPublicationStatus status,
            LocalDateTime scheduledAt
    );

    List<ScheduledPublication>
    findByContentTypeAndContentId(
            String contentType,
            Long contentId
    );
}