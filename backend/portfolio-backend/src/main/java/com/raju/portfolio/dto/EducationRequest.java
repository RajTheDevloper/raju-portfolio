package com.raju.portfolio.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class EducationRequest {

    @NotBlank(message = "Institution name is required")
    @Size(
        max = 200,
        message = "Institution name must not exceed 200 characters"
    )
    private String institutionName;

    @NotBlank(message = "Degree is required")
    @Size(
        max = 200,
        message = "Degree must not exceed 200 characters"
    )
    private String degree;

    @Size(
        max = 200,
        message = "Field of study must not exceed 200 characters"
    )
    private String fieldOfStudy;

    @Size(
        max = 200,
        message = "Location must not exceed 200 characters"
    )
    private String location;

    @NotNull(message = "Start date is required")
    private LocalDate startDate;

    private LocalDate endDate;

    private boolean current;

    @Size(
        max = 2000,
        message = "Description must not exceed 2000 characters"
    )
    private String description;

    @NotNull(message = "Display order is required")
    private Integer displayOrder;

    public EducationRequest() {
    }

    public String getInstitutionName() {
        return institutionName;
    }

    public void setInstitutionName(String institutionName) {
        this.institutionName = institutionName;
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public String getFieldOfStudy() {
        return fieldOfStudy;
    }

    public void setFieldOfStudy(String fieldOfStudy) {
        this.fieldOfStudy = fieldOfStudy;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public boolean isCurrent() {
        return current;
    }

    public void setCurrent(boolean current) {
        this.current = current;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }
}