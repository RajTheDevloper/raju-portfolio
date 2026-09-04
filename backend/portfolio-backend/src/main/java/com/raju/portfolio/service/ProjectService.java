package com.raju.portfolio.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.raju.portfolio.dto.ProjectRequest;
import com.raju.portfolio.dto.ProjectResponse;
import com.raju.portfolio.entity.Project;
import com.raju.portfolio.entity.Technology;
import com.raju.portfolio.exception.DuplicateProjectSlugException;
import com.raju.portfolio.exception.ProjectNotFoundBySlugException;
import com.raju.portfolio.exception.ProjectNotFoundException;
import com.raju.portfolio.exception.TechnologyNotFoundException;
import com.raju.portfolio.mapper.ProjectMapper;
import com.raju.portfolio.repository.ProjectRepository;
import com.raju.portfolio.repository.TechnologyRepository;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    private final ProjectMapper projectMapper;

    private final TechnologyRepository technologyRepository;

    public ProjectService(
            ProjectRepository projectRepository,
            ProjectMapper projectMapper,
            TechnologyRepository technologyRepository) {

        this.projectRepository = projectRepository;
        this.projectMapper = projectMapper;
        this.technologyRepository = technologyRepository;
    }

    @Transactional(readOnly = true)
    public List<ProjectResponse> getAllProjects() {

        List<Project> projects =
                projectRepository.findAll();

        return projects.stream()
                .map(projectMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public ProjectResponse getProjectById(
            Long id) {

        Project project =
                projectRepository.findById(id)
                        .orElseThrow(
                                () -> new ProjectNotFoundException(id)
                        );

        return projectMapper.toResponse(project);
    }

    @Transactional(readOnly = true)
    public ProjectResponse getProjectBySlug(
            String slug) {

        Project project =
                projectRepository.findBySlug(slug)
                        .orElseThrow(
                                () -> new ProjectNotFoundBySlugException(slug)
                        );

        return projectMapper.toResponse(project);
    }

    @Transactional
    public ProjectResponse saveProject(
            ProjectRequest request) {

        if (projectRepository.existsBySlug(
                request.getSlug())) {

            throw new DuplicateProjectSlugException(
                    request.getSlug()
            );
        }

        Set<Technology> technologies =
                resolveTechnologies(
                        request.getTechnologyIds()
                );

        Project project =
                projectMapper.toEntity(
                        request,
                        technologies
                );

        Project savedProject =
                projectRepository.save(project);

        return projectMapper.toResponse(
                savedProject
        );
    }

    @Transactional
    public ProjectResponse updateProject(
            Long id,
            ProjectRequest request) {

        Project existingProject =
                projectRepository.findById(id)
                        .orElseThrow(
                                () -> new ProjectNotFoundException(id)
                        );

        if (projectRepository.existsBySlugAndIdNot(
                request.getSlug(),
                id)) {

            throw new DuplicateProjectSlugException(
                    request.getSlug()
            );
        }

        Set<Technology> technologies =
                resolveTechnologies(
                        request.getTechnologyIds()
                );

        projectMapper.updateEntity(
                existingProject,
                request,
                technologies
        );

        Project updatedProject =
                projectRepository.save(
                        existingProject
                );

        return projectMapper.toResponse(
                updatedProject
        );
    }

    @Transactional
    public void deleteProject(Long id) {

        Project existingProject =
                projectRepository.findById(id)
                        .orElseThrow(
                                () -> new ProjectNotFoundException(id)
                        );

        projectRepository.delete(
                existingProject
        );
    }

    private Set<Technology> resolveTechnologies(
            Set<Long> technologyIds) {

        List<Technology> technologies =
                technologyRepository.findAllById(
                        technologyIds
                );

        if (technologies.size()
                != technologyIds.size()) {

            Set<Long> foundIds =
                    technologies.stream()
                            .map(Technology::getId)
                            .collect(Collectors.toSet());

            Long missingId =
                    technologyIds.stream()
                            .filter(id -> !foundIds.contains(id))
                            .findFirst()
                            .orElseThrow();

            throw new TechnologyNotFoundException(
                    missingId
            );
        }

        return new HashSet<>(technologies);
    }
}