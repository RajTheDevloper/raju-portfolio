package com.raju.portfolio.mapper;

import org.springframework.stereotype.Component;

import com.raju.portfolio.dto.ExperienceRequest;
import com.raju.portfolio.dto.ExperienceResponse;
import com.raju.portfolio.entity.Experience;

@Component
public class ExperienceMapper {

    public Experience toEntity(
            ExperienceRequest request) {

        Experience experience = new Experience();

        experience.setCompanyName(
                request.getCompanyName()
        );

        experience.setJobTitle(
                request.getJobTitle()
        );

        experience.setLocation(
                request.getLocation()
        );

        experience.setEmploymentType(
                request.getEmploymentType()
        );

        experience.setStartDate(
                request.getStartDate()
        );

        experience.setEndDate(
                request.getEndDate()
        );

        experience.setCurrent(
                request.isCurrent()
        );

        experience.setDescription(
                request.getDescription()
        );

        experience.setResponsibilities(
                request.getResponsibilities()
        );

        experience.setDisplayOrder(
                request.getDisplayOrder()
        );

        return experience;
    }

    public void updateEntity(
            Experience experience,
            ExperienceRequest request) {

        experience.setCompanyName(
                request.getCompanyName()
        );

        experience.setJobTitle(
                request.getJobTitle()
        );

        experience.setLocation(
                request.getLocation()
        );

        experience.setEmploymentType(
                request.getEmploymentType()
        );

        experience.setStartDate(
                request.getStartDate()
        );

        experience.setEndDate(
                request.getEndDate()
        );

        experience.setCurrent(
                request.isCurrent()
        );

        experience.setDescription(
                request.getDescription()
        );

        experience.setResponsibilities(
                request.getResponsibilities()
        );

        experience.setDisplayOrder(
                request.getDisplayOrder()
        );
    }

    public ExperienceResponse toResponse(
            Experience experience) {

        ExperienceResponse response =
                new ExperienceResponse();

        response.setId(
                experience.getId()
        );

        response.setCompanyName(
                experience.getCompanyName()
        );

        response.setJobTitle(
                experience.getJobTitle()
        );

        response.setLocation(
                experience.getLocation()
        );

        response.setEmploymentType(
                experience.getEmploymentType()
        );

        response.setStartDate(
                experience.getStartDate()
        );

        response.setEndDate(
                experience.getEndDate()
        );

        response.setCurrent(
                experience.isCurrent()
        );

        response.setDescription(
                experience.getDescription()
        );

        response.setResponsibilities(
                experience.getResponsibilities()
        );

        response.setDisplayOrder(
                experience.getDisplayOrder()
        );

        response.setStatus(
                experience.getStatus().name()
        );

        return response;
    }
}