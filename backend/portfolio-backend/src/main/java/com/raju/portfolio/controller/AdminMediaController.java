package com.raju.portfolio.controller;

import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.raju.portfolio.dto.media.MediaFileResponse;
import com.raju.portfolio.dto.media.MediaResponse;
import com.raju.portfolio.service.MediaService;

@RestController
@RequestMapping("/api/admin/media")
public class AdminMediaController {

    private final MediaService mediaService;

    public AdminMediaController(MediaService mediaService) {
        this.mediaService = mediaService;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<MediaResponse> upload(
            @RequestParam("file") MultipartFile file,
            @RequestParam("mediaType") com.raju.portfolio.enums.MediaType mediaType,
            Authentication authentication) {

        String uploadedBy = authentication.getName();

        MediaResponse response = mediaService.upload(
                file,
                mediaType,
                uploadedBy
        );

        return ResponseEntity
                .status(201)
                .body(response);
    }

    @GetMapping
    public ResponseEntity<List<MediaResponse>> getAll() {

        return ResponseEntity.ok(
                mediaService.getAll()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<MediaResponse> getById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                mediaService.getById(id)
        );
    }

    @GetMapping("/{id}/file")
    public ResponseEntity<byte[]> download(
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


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Long id) {

        mediaService.delete(id);

        return ResponseEntity.noContent().build();
    }
}
