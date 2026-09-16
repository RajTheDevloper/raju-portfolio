package com.raju.portfolio.service;

import com.raju.portfolio.entity.ScheduledPublication;
import com.raju.portfolio.enums.ScheduledPublicationStatus;
import com.raju.portfolio.repository.ScheduledPublicationRepository;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ScheduledPublicationProcessor {

    private final ScheduledPublicationRepository repository;

    private final ProjectService projectService;

    public ScheduledPublicationProcessor(
            ScheduledPublicationRepository repository,
            ProjectService projectService) {

        this.repository = repository;
        this.projectService = projectService;
    }

    @Scheduled(fixedRate = 60000)
    @Transactional
    public void processScheduledPublications() {

        LocalDateTime now = LocalDateTime.now();

        List<ScheduledPublication> publications =
                repository
                        .findByStatusAndScheduledAtLessThanEqual(
                                ScheduledPublicationStatus.SCHEDULED,
                                now
                        );

        for (ScheduledPublication publication : publications) {

            try {

                if ("PROJECT".equalsIgnoreCase(
                        publication.getContentType())) {

                    projectService.publishSpecificRevision(
                            publication.getContentId(),
                            publication.getRevisionVersion()
                    );

                    publication.setStatus(
                            ScheduledPublicationStatus.COMPLETED
                    );

                    repository.save(publication);
                }

            } catch (Exception exception) {

                publication.setStatus(
                        ScheduledPublicationStatus.FAILED
                );

                repository.save(publication);
            }
        }
    }
}