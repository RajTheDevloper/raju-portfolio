package com.raju.portfolio.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.raju.portfolio.entity.ContentRevision;

public interface ContentRevisionRepository
        extends JpaRepository<ContentRevision, Long> {

    List<ContentRevision>
    findAllByContentTypeAndContentIdOrderByVersionNumberDesc(
            String contentType,
            Long contentId
    );

    Optional<ContentRevision>
    findTopByContentTypeAndContentIdOrderByVersionNumberDesc(
            String contentType,
            Long contentId
    );
}