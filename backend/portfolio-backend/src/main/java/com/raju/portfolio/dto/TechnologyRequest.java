package com.raju.portfolio.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class TechnologyRequest {

    @NotBlank(message = "Technology name is required")
    @Size(max = 100, message = "Technology name must not exceed 100 characters")
    private String name;

    @NotBlank(message = "Technology slug is required")
    @Size(max = 100, message = "Technology slug must not exceed 100 characters")
    private String slug;

    public TechnologyRequest() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }
}