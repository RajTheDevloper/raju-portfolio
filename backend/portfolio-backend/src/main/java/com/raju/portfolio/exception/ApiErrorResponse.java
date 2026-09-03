package com.raju.portfolio.exception;

import java.time.LocalDateTime;
import java.util.Map;

public class ApiErrorResponse {

    private int status;
    private String message;
    private Map<String, String> errors;
    private LocalDateTime timestamp;
    private String path;

    public ApiErrorResponse(
            int status,
            String message,
            Map<String, String> errors,
            LocalDateTime timestamp,
            String path) {

        this.status = status;
        this.message = message;
        this.errors = errors;
        this.timestamp = timestamp;
        this.path = path;
    }

    public int getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }

    public Map<String, String> getErrors() {
        return errors;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public String getPath() {
        return path;
    }
}