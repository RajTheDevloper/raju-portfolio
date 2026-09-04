package com.raju.portfolio.mapper;

import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Component;

import com.raju.portfolio.dto.ProjectRequest;
import com.raju.portfolio.dto.ProjectResponse;
import com.raju.portfolio.dto.TechnologyResponse;
import com.raju.portfolio.entity.Project;
import com.raju.portfolio.entity.Technology;

@Component
public class ProjectMapper {

    private final TechnologyMapper technologyMapper;

    public ProjectMapper(
            TechnologyMapper technologyMapper) {

        this.technologyMapper = technologyMapper;
    }

    public Project toEntity(
            ProjectRequest request,
            Set<Technology> technologies) {

        Project project = new Project();

        updateEntity(
                project,
                request,
                technologies
        );

        return project;
    }

    public void updateEntity(
            Project project,
            ProjectRequest request,
            Set<Technology> technologies) {

        project.setName(request.getName());
        project.setSlug(request.getSlug());
        project.setDescription(request.getDescription());
        project.setTechnologies(technologies);
        project.setGithubUrl(request.getGithubUrl());
        project.setLiveUrl(request.getLiveUrl());
        project.setImageUrl(request.getImageUrl());
        project.setFeatured(request.getFeatured());
        project.setDisplayOrder(request.getDisplayOrder());
    }

    public ProjectResponse toResponse(
            Project project) {

        ProjectResponse response =
                new ProjectResponse();

        response.setId(project.getId());
        response.setName(project.getName());
        response.setSlug(project.getSlug());
        response.setDescription(project.getDescription());

        List<TechnologyResponse> technologies =
                project.getTechnologies()
                        .stream()
                        .map(technologyMapper::toResponse)
                        .toList();

        response.setTechnologies(technologies);

        response.setGithubUrl(project.getGithubUrl());
        response.setLiveUrl(project.getLiveUrl());
        response.setImageUrl(project.getImageUrl());
        response.setFeatured(project.isFeatured());
        response.setDisplayOrder(project.getDisplayOrder());

        return response;
    }
}