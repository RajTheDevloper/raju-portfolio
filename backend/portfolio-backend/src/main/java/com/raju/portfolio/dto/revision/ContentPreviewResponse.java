package com.raju.portfolio.dto.revision;

import java.time.LocalDateTime;

public class ContentPreviewResponse {

    private String contentType;

    private Long contentId;

    private Integer versionNumber;

    private String status;

    private LocalDateTime createdAt;

    private String createdBy;

    private String snapshot;

    public ContentPreviewResponse() {
    }

	public String getContentType() {
		return contentType;
	}

	public void setContentType(String contentType) {
		this.contentType = contentType;
	}

	public Long getContentId() {
		return contentId;
	}

	public void setContentId(Long contentId) {
		this.contentId = contentId;
	}

	public Integer getVersionNumber() {
		return versionNumber;
	}

	public void setVersionNumber(Integer versionNumber) {
		this.versionNumber = versionNumber;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public String getSnapshot() {
		return snapshot;
	}

	public void setSnapshot(String snapshot) {
		this.snapshot = snapshot;
	}

    
}