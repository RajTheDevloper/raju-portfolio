package com.raju.portfolio.dto.schedule;

import com.raju.portfolio.enums.ScheduledPublicationStatus;

import java.time.LocalDateTime;

public class ScheduledPublicationResponse {

    private Long id;

    private String contentType;

    private Long contentId;

    private Integer revisionVersion;

    private LocalDateTime scheduledAt;

    private ScheduledPublicationStatus status;

    private LocalDateTime createdAt;

    private String createdBy;

    public ScheduledPublicationResponse() {
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public Integer getRevisionVersion() {
		return revisionVersion;
	}

	public void setRevisionVersion(Integer revisionVersion) {
		this.revisionVersion = revisionVersion;
	}

	public LocalDateTime getScheduledAt() {
		return scheduledAt;
	}

	public void setScheduledAt(LocalDateTime scheduledAt) {
		this.scheduledAt = scheduledAt;
	}

	public ScheduledPublicationStatus getStatus() {
		return status;
	}

	public void setStatus(ScheduledPublicationStatus status) {
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
    
    

}