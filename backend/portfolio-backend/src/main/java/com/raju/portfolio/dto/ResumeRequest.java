package com.raju.portfolio.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class ResumeRequest {

    @NotBlank(message = "File name is required")
    @Size(max = 200, message = "File name must not exceed 200 characters")
    private String fileName;

    @NotBlank(message = "File URL is required")
    @Size(max = 500, message = "File URL must not exceed 500 characters")
    @Pattern(
        regexp = "^https?://.*$",
        message = "File URL must start with http:// or https://"
    )
    private String fileUrl;

    @Size(max = 50, message = "File type must not exceed 50 characters")
    private String fileType;

    private Long fileSize;

    public ResumeRequest() {
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public Long getFileSize() {
        return fileSize;
    }

    public void setFileSize(Long fileSize) {
        this.fileSize = fileSize;
    }
}
