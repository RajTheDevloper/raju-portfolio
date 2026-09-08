package com.raju.portfolio.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class SkillRequest {

    @NotBlank(message = "Skill name is required")
    @Size(
        max = 100,
        message = "Skill name must not exceed 100 characters"
    )
    private String name;

    @NotBlank(message = "Slug is required")
    @Size(
        max = 100,
        message = "Slug must not exceed 100 characters"
    )
    @Pattern(
        regexp = "^[a-z0-9]+(?:-[a-z0-9]+)*$",
        message = "Slug must contain only lowercase letters, numbers and hyphens"
    )
    private String slug;

    @NotBlank(message = "Category is required")
    @Size(
        max = 100,
        message = "Category must not exceed 100 characters"
    )
    private String category;

    @NotBlank(message = "Proficiency is required")
    @Pattern(
        regexp = "^(Beginner|Intermediate|Advanced|Expert)$",
        message = "Proficiency must be Beginner, Intermediate, Advanced or Expert"
    )
    private String proficiency;

    @NotNull(message = "Years of experience is required")
    @Min(
        value = 0,
        message = "Years of experience cannot be negative"
    )
    @Max(
        value = 50,
        message = "Years of experience cannot exceed 50"
    )
    private Integer yearsOfExperience;

    @Size(
        max = 1000,
        message = "Description must not exceed 1000 characters"
    )
    private String description;

    private boolean featured;

    @NotNull(message = "Display order is required")
    @Min(
        value = 0,
        message = "Display order cannot be negative"
    )
    private Integer displayOrder;

    public SkillRequest() {
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

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getProficiency() {
        return proficiency;
    }

    public void setProficiency(String proficiency) {
        this.proficiency = proficiency;
    }

    public Integer getYearsOfExperience() {
        return yearsOfExperience;
    }

    public void setYearsOfExperience(Integer yearsOfExperience) {
        this.yearsOfExperience = yearsOfExperience;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isFeatured() {
        return featured;
    }

    public void setFeatured(boolean featured) {
        this.featured = featured;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }
}