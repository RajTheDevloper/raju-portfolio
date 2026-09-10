package com.raju.portfolio.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ContactMessageRequest {

    @NotBlank(message = "Name is required")
    @Size(
        max = 100,
        message = "Name must not exceed 100 characters"
    )
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Please provide a valid email address")
    @Size(
        max = 200,
        message = "Email must not exceed 200 characters"
    )
    private String email;

    @Size(
        max = 200,
        message = "Subject must not exceed 200 characters"
    )
    private String subject;

    @NotBlank(message = "Message is required")
    @Size(
        max = 5000,
        message = "Message must not exceed 5000 characters"
    )
    private String message;

    public ContactMessageRequest() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
