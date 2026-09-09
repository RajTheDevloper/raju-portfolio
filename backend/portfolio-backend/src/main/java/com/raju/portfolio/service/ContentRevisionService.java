package com.raju.portfolio.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.raju.portfolio.entity.ContentRevision;
import com.raju.portfolio.repository.ContentRevisionRepository;

import tools.jackson.core.JacksonException;
import tools.jackson.databind.ObjectMapper;

@Service
public class ContentRevisionService {

    private final ContentRevisionRepository
            contentRevisionRepository;

    private final ObjectMapper objectMapper;

    public ContentRevisionService(
            ContentRevisionRepository contentRevisionRepository,
            ObjectMapper objectMapper) {

        this.contentRevisionRepository =
                contentRevisionRepository;

        this.objectMapper = objectMapper;
    }

    @Transactional
    public ContentRevision createRevision(
            String contentType,
            Long contentId,
            String status,
            String createdBy,
            Object content) {

        int nextVersion =
                getNextVersionNumber(
                        contentType,
                        contentId
                );

        String snapshot;

        try {

            snapshot =
                    objectMapper.writeValueAsString(
                            content
                    );

        } catch (JacksonException exception) {

            throw new IllegalStateException(
                    "Failed to create content snapshot",
                    exception
            );
        }

        ContentRevision revision =
                new ContentRevision();

        revision.setContentType(contentType);
        revision.setContentId(contentId);
        revision.setVersionNumber(nextVersion);
        revision.setStatus(status);
        revision.setCreatedAt(
                LocalDateTime.now()
        );
        revision.setCreatedBy(createdBy);
        revision.setSnapshot(snapshot);

        return contentRevisionRepository.save(
                revision
        );
    }

    @Transactional(readOnly = true)
    public List<ContentRevision> getRevisionHistory(
            String contentType,
            Long contentId) {

        return contentRevisionRepository
                .findAllByContentTypeAndContentIdOrderByVersionNumberDesc(
                        contentType,
                        contentId
                );
    }

    private int getNextVersionNumber(
            String contentType,
            Long contentId) {

        return contentRevisionRepository
                .findTopByContentTypeAndContentIdOrderByVersionNumberDesc(
                        contentType,
                        contentId
                )
                .map(revision ->
                        revision.getVersionNumber() + 1
                )
                .orElse(1);
    }
}


