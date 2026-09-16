package com.raju.portfolio.dto.media;

import java.time.LocalDateTime;

import com.raju.portfolio.enums.MediaType;

public class MediaResponse {

    private Long id;
    private String originalFileName;
    private String contentType;
    private Long fileSize;
//    private String storagePath;
    private MediaType mediaType;
    private LocalDateTime uploadedAt;
    private String uploadedBy;
    private boolean publiclyAccessible;

    public MediaResponse() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOriginalFileName() {
        return originalFileName;
    }

    public void setOriginalFileName(String originalFileName) {
        this.originalFileName = originalFileName;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public Long getFileSize() {
        return fileSize;
    }

    public void setFileSize(Long fileSize) {
        this.fileSize = fileSize;
    }

//    public String getStoragePath() {
//        return storagePath;
//    }
//
//    public void setStoragePath(String storagePath) {
//        this.storagePath = storagePath;
//    }

    public MediaType getMediaType() {
        return mediaType;
    }

    public void setMediaType(MediaType mediaType) {
        this.mediaType = mediaType;
    }

    public LocalDateTime getUploadedAt() {
        return uploadedAt;
    }

    public void setUploadedAt(LocalDateTime uploadedAt) {
        this.uploadedAt = uploadedAt;
    }

    public String getUploadedBy() {
        return uploadedBy;
    }

    public void setUploadedBy(String uploadedBy) {
        this.uploadedBy = uploadedBy;
    }
    
    public boolean isPubliclyAccessible() {
        return publiclyAccessible;
    }

    public void setPubliclyAccessible(boolean publiclyAccessible) {
        this.publiclyAccessible = publiclyAccessible;
    }
}