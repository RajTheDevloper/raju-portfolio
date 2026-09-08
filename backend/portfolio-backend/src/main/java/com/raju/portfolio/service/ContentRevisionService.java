package com.raju.portfolio.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.raju.portfolio.entity.ContentRevision;
import com.raju.portfolio.repository.ContentRevisionRepository;

@Service
public class ContentRevisionService {

    private final ContentRevisionRepository
            contentRevisionRepository;

    public ContentRevisionService(
            ContentRevisionRepository contentRevisionRepository) {

        this.contentRevisionRepository =
                contentRevisionRepository;
    }

    @Transactional
    public ContentRevision createRevision(
            String contentType,
            Long contentId,
            String status,
            String createdBy,
            String snapshot) {

        int nextVersion = getNextVersionNumber(
                contentType,
                contentId
        );

        ContentRevision revision =
                new ContentRevision();

        revision.setContentType(contentType);
        revision.setContentId(contentId);
        revision.setVersionNumber(nextVersion);
        revision.setStatus(status);
        revision.setCreatedAt(LocalDateTime.now());
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