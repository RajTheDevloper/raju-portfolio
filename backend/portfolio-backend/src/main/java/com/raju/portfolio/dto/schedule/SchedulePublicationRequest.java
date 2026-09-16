package com.raju.portfolio.dto.schedule;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public class SchedulePublicationRequest {

    @NotNull(message = "scheduledAt is required")
    @Future(message = "scheduledAt must be in the future")
    private LocalDateTime scheduledAt;

    public SchedulePublicationRequest() {
    }

    public LocalDateTime getScheduledAt() {
        return scheduledAt;
    }

    public void setScheduledAt(LocalDateTime scheduledAt) {
        this.scheduledAt = scheduledAt;
    }
}