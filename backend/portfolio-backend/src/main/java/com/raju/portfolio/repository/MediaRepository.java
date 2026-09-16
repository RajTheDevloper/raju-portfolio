package com.raju.portfolio.repository;

import com.raju.portfolio.entity.Media;
import com.raju.portfolio.enums.MediaType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MediaRepository
        extends JpaRepository<Media, Long> {

    List<Media> findByMediaType(MediaType mediaType);

    List<Media> findByPubliclyAccessibleTrue();

}