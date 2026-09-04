package com.raju.portfolio.dto;

import java.util.Set;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class ProjectRequest {

    @NotBlank(message = "Project name is required")
    @Size(
            max = 150,
            message = "Project name must not exceed 150 characters"
    )
    private String name;

    @NotBlank(message = "Slug is required")
    @Size(
            max = 200,
            message = "Slug must not exceed 200 characters"
    )
    private String slug;

    @NotBlank(message = "Description is required")
    @Size(
            max = 5000,
            message = "Description must not exceed 5000 characters"
    )
    private String description;

    @NotEmpty(message = "At least one technology is required")
    private Set<Long> technologyIds;

    @Size(
            max = 500,
            message = "GitHub URL must not exceed 500 characters"
    )
    @Pattern(
            regexp = "^$|https?://.*$",
            message = "GitHub URL must be a valid HTTP or HTTPS URL"
    )
    private String githubUrl;

    @Size(
            max = 500,
            message = "Live URL must not exceed 500 characters"
    )
    @Pattern(
            regexp = "^$|https?://.*$",
            message = "Live URL must be a valid HTTP or HTTPS URL"
    )
    private String liveUrl;

    @Size(
            max = 500,
            message = "Image URL must not exceed 500 characters"
    )
    private String imageUrl;

    @NotNull(message = "Featured value is required")
    private Boolean featured;

    @NotNull(message = "Display order is required")
    private Integer displayOrder;

    public ProjectRequest() {
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Long> getTechnologyIds() {
        return technologyIds;
    }

    public void setTechnologyIds(Set<Long> technologyIds) {
        this.technologyIds = technologyIds;
    }

    public String getGithubUrl() {
        return githubUrl;
    }

    public void setGithubUrl(String githubUrl) {
        this.githubUrl = githubUrl;
    }

    public String getLiveUrl() {
        return liveUrl;
    }

    public void setLiveUrl(String liveUrl) {
        this.liveUrl = liveUrl;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Boolean getFeatured() {
        return featured;
    }

    public void setFeatured(Boolean featured) {
        this.featured = featured;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }
}