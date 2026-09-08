package com.raju.portfolio.mapper;

import org.springframework.stereotype.Component;

import com.raju.portfolio.dto.EducationRequest;
import com.raju.portfolio.dto.EducationResponse;
import com.raju.portfolio.entity.Education;

@Component
public class EducationMapper {

    public Education toEntity(
            EducationRequest request) {

        Education education = new Education();

        education.setInstitutionName(
                request.getInstitutionName()
        );

        education.setDegree(
                request.getDegree()
        );

        education.setFieldOfStudy(
                request.getFieldOfStudy()
        );

        education.setLocation(
                request.getLocation()
        );

        education.setStartDate(
                request.getStartDate()
        );

        education.setEndDate(
                request.getEndDate()
        );

        education.setCurrent(
                request.isCurrent()
        );

        education.setDescription(
                request.getDescription()
        );

        education.setDisplayOrder(
                request.getDisplayOrder()
        );

        return education;
    }

    public void updateEntity(
            Education education,
            EducationRequest request) {

        education.setInstitutionName(
                request.getInstitutionName()
        );

        education.setDegree(
                request.getDegree()
        );

        education.setFieldOfStudy(
                request.getFieldOfStudy()
        );

        education.setLocation(
                request.getLocation()
        );

        education.setStartDate(
                request.getStartDate()
        );

        education.setEndDate(
                request.getEndDate()
        );

        education.setCurrent(
                request.isCurrent()
        );

        education.setDescription(
                request.getDescription()
        );

        education.setDisplayOrder(
                request.getDisplayOrder()
        );
    }

    public EducationResponse toResponse(
            Education education) {

        EducationResponse response =
                new EducationResponse();

        response.setId(
                education.getId()
        );

        response.setInstitutionName(
                education.getInstitutionName()
        );

        response.setDegree(
                education.getDegree()
        );

        response.setFieldOfStudy(
                education.getFieldOfStudy()
        );

        response.setLocation(
                education.getLocation()
        );

        response.setStartDate(
                education.getStartDate()
        );

        response.setEndDate(
                education.getEndDate()
        );

        response.setCurrent(
                education.isCurrent()
        );

        response.setDescription(
                education.getDescription()
        );

        response.setDisplayOrder(
                education.getDisplayOrder()
        );

        response.setStatus(
                education.getStatus().name()
        );

        return response;
    }
}