package com.raju.portfolio.entity;

import java.time.LocalDateTime;

import com.raju.portfolio.enums.ScheduledPublicationStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "scheduled_publication")
public class ScheduledPublication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String contentType;

    @Column(nullable = false)
    private Long contentId;

    @Column(nullable = false)
    private Integer revisionVersion;

    @Column(nullable = false)
    private LocalDateTime scheduledAt;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ScheduledPublicationStatus status;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(length = 100)
    private String createdBy;

    public ScheduledPublication() {
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