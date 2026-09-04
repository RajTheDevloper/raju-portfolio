package com.raju.portfolio.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.raju.portfolio.dto.ProjectRequest;
import com.raju.portfolio.dto.ProjectResponse;
import com.raju.portfolio.entity.Project;
import com.raju.portfolio.exception.ProjectNotFoundBySlugException;
import com.raju.portfolio.exception.ProjectNotFoundException;
import com.raju.portfolio.mapper.ProjectMapper;
import com.raju.portfolio.repository.ProjectRepository;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;

    public ProjectService(
            ProjectRepository projectRepository,
            ProjectMapper projectMapper) {

        this.projectRepository = projectRepository;
        this.projectMapper = projectMapper;
    }

    public List<ProjectResponse> getAllProjects() {

        List<Project> projects =
                projectRepository.findAll();

        return projects.stream()
                .map(projectMapper::toResponse)
                .toList();
    }

    public ProjectResponse getProjectById(Long id) {

        Project project =
                projectRepository.findById(id)
                        .orElseThrow(
                                () -> new ProjectNotFoundException(id)
                        );

        return projectMapper.toResponse(project);
    }
    
    public ProjectResponse getProjectBySlug(String slug) {

        Project project =
                projectRepository.findBySlug(slug)
                        .orElseThrow(
                                () -> new ProjectNotFoundBySlugException(slug)
                        );

        return projectMapper.toResponse(project);
    }

    public ProjectResponse saveProject(
            ProjectRequest request) {

        Project project =
                projectMapper.toEntity(request);

        Project savedProject =
                projectRepository.save(project);

        return projectMapper.toResponse(savedProject);
    }

    public ProjectResponse updateProject(
            Long id,
            ProjectRequest request) {

        Project existingProject =
                projectRepository.findById(id)
                        .orElseThrow(
                                () -> new ProjectNotFoundException(id)
                        );

        projectMapper.updateEntity(
                existingProject,
                request
        );

        Project updatedProject =
                projectRepository.save(existingProject);

        return projectMapper.toResponse(updatedProject);
    }

    public void deleteProject(Long id) {

        Project existingProject =
                projectRepository.findById(id)
                        .orElseThrow(
                                () -> new ProjectNotFoundException(id)
                        );

        projectRepository.delete(existingProject);
    }
}