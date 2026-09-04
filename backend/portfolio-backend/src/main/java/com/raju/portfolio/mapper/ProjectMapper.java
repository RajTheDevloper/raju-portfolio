package com.raju.portfolio.mapper;

import org.springframework.stereotype.Component;

import com.raju.portfolio.dto.ProjectRequest;
import com.raju.portfolio.dto.ProjectResponse;
import com.raju.portfolio.entity.Project;

@Component
public class ProjectMapper {

    public Project toEntity(ProjectRequest request) {

        Project project = new Project();

        updateEntity(project, request);

        return project;
    }

    public void updateEntity(
            Project project,
            ProjectRequest request) {

        project.setName(request.getName());
        project.setSlug(request.getSlug());
        project.setDescription(request.getDescription());
        project.setTechnologies(request.getTechnologies());
        project.setGithubUrl(request.getGithubUrl());
        project.setLiveUrl(request.getLiveUrl());
        project.setImageUrl(request.getImageUrl());
        project.setFeatured(request.getFeatured());
        project.setDisplayOrder(request.getDisplayOrder());
    }

    public ProjectResponse toResponse(Project project) {

        ProjectResponse response = new ProjectResponse();

        response.setId(project.getId());
        response.setName(project.getName());
        response.setSlug(project.getSlug());
        response.setDescription(project.getDescription());
        response.setTechnologies(project.getTechnologies());
        response.setGithubUrl(project.getGithubUrl());
        response.setLiveUrl(project.getLiveUrl());
        response.setImageUrl(project.getImageUrl());
        response.setFeatured(project.isFeatured());
        response.setDisplayOrder(project.getDisplayOrder());

        return response;
    }
}