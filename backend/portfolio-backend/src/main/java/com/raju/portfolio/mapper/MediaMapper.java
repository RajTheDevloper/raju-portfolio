package com.raju.portfolio.mapper;

import com.raju.portfolio.dto.media.MediaResponse;
import com.raju.portfolio.entity.Media;
import org.springframework.stereotype.Component;

@Component
public class MediaMapper {

    public MediaResponse toResponse(Media media) {

        MediaResponse response = new MediaResponse();

        response.setId(media.getId());
        response.setOriginalFileName(media.getOriginalFileName());
        response.setContentType(media.getContentType());
        response.setFileSize(media.getFileSize());
        response.setStoragePath(media.getStoragePath());
        response.setMediaType(media.getMediaType());
        response.setUploadedAt(media.getUploadedAt());
        response.setUploadedBy(media.getUploadedBy());

        return response;
    }
}