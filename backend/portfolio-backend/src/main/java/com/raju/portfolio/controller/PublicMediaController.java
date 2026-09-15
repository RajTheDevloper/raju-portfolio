package com.raju.portfolio.controller;

import com.raju.portfolio.dto.media.MediaFileResponse;
import com.raju.portfolio.service.MediaService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/public/media")
public class PublicMediaController {

    private final MediaService mediaService;

    public PublicMediaController(MediaService mediaService) {
        this.mediaService = mediaService;
    }

    @GetMapping("/{id}/file")
    public ResponseEntity<byte[]> getFile(
            @PathVariable Long id) {

        MediaFileResponse mediaFile =
                mediaService.getFile(id);

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "inline; filename=\"" +
                                mediaFile.getOriginalFileName() +
                                "\""
                )
                .contentType(
                        MediaType.parseMediaType(
                                mediaFile.getContentType()
                        )
                )
                .contentLength(
                        mediaFile.getFileSize()
                )
                .body(
                        mediaFile.getContent()
                );
    }
}
