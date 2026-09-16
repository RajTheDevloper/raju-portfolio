package com.raju.portfolio.service;

import com.raju.portfolio.dto.schedule.SchedulePublicationRequest;
import com.raju.portfolio.dto.schedule.ScheduledPublicationResponse;
import com.raju.portfolio.entity.ContentRevision;
import com.raju.portfolio.entity.ScheduledPublication;
import com.raju.portfolio.enums.ScheduledPublicationStatus;
import com.raju.portfolio.repository.ContentRevisionRepository;
import com.raju.portfolio.repository.ScheduledPublicationRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class ScheduledPublicationService {

    private final ScheduledPublicationRepository
            scheduledPublicationRepository;

    private final ContentRevisionRepository
            contentRevisionRepository;

    public ScheduledPublicationService(
            ScheduledPublicationRepository scheduledPublicationRepository,
            ContentRevisionRepository contentRevisionRepository) {

        this.scheduledPublicationRepository =
                scheduledPublicationRepository;

        this.contentRevisionRepository =
                contentRevisionRepository;
    }

    public ScheduledPublicationResponse schedule(
            String contentType,
            Long contentId,
            SchedulePublicationRequest request,
            String createdBy) {

        ContentRevision latestDraft =
                contentRevisionRepository
                        .findTopByContentTypeAndContentIdAndStatusOrderByVersionNumberDesc(
                                contentType,
                                contentId,
                                "DRAFT"
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "No draft revision found"
                                )
                        );

        ScheduledPublication scheduled =
                new ScheduledPublication();

        scheduled.setContentType(contentType);
        scheduled.setContentId(contentId);
        scheduled.setRevisionVersion(
                latestDraft.getVersionNumber()
        );
        scheduled.setScheduledAt(
                request.getScheduledAt()
        );
        scheduled.setStatus(
                ScheduledPublicationStatus.SCHEDULED
        );
        scheduled.setCreatedAt(
                LocalDateTime.now()
        );
        scheduled.setCreatedBy(createdBy);

        return toResponse(
                scheduledPublicationRepository.save(scheduled)
        );
    }

    public List<ScheduledPublicationResponse> getAll() {

        return scheduledPublicationRepository
                .findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private ScheduledPublicationResponse toResponse(
            ScheduledPublication entity) {

        ScheduledPublicationResponse response =
                new ScheduledPublicationResponse();

        response.setId(entity.getId());
        response.setContentType(entity.getContentType());
        response.setContentId(entity.getContentId());
        response.setRevisionVersion(
                entity.getRevisionVersion()
        );
        response.setScheduledAt(
                entity.getScheduledAt()
        );
        response.setStatus(
                entity.getStatus()
        );
        response.setCreatedAt(
                entity.getCreatedAt()
        );
        response.setCreatedBy(
                entity.getCreatedBy()
        );

        return response;
    }
}