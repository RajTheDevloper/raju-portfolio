package com.raju.portfolio.service;


import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.raju.portfolio.dto.common.PageResponse;
import com.raju.portfolio.dto.common.PageResponseMapper;
import com.raju.portfolio.dto.ProjectRequest;
import com.raju.portfolio.dto.ProjectResponse;
import com.raju.portfolio.entity.ContentRevision;
import com.raju.portfolio.entity.ContentStatus;
import com.raju.portfolio.entity.Media;
import com.raju.portfolio.entity.Project;
import com.raju.portfolio.entity.Technology;
import com.raju.portfolio.enums.AuditAction;
import com.raju.portfolio.exception.DuplicateProjectSlugException;
import com.raju.portfolio.exception.MediaNotFoundException;
import com.raju.portfolio.exception.ProjectNotFoundBySlugException;
import com.raju.portfolio.exception.ProjectNotFoundException;
import com.raju.portfolio.exception.TechnologyNotFoundException;
import com.raju.portfolio.mapper.ProjectMapper;
import com.raju.portfolio.repository.ContentRevisionRepository;
import com.raju.portfolio.repository.MediaRepository;
import com.raju.portfolio.repository.ProjectRepository;
import com.raju.portfolio.repository.TechnologyRepository;


@Service
public class ProjectService {

    private final ContentRevisionRepository contentRevisionRepository;

	private final ProjectRepository projectRepository;

    private final ProjectMapper projectMapper;

    private final TechnologyRepository technologyRepository;

    private final ContentRevisionService contentRevisionService;
    
    private final MediaRepository mediaRepository;
    
    private final AuditLogService auditLogService;

    public ProjectService(
            ProjectRepository projectRepository,
            ProjectMapper projectMapper,
            TechnologyRepository technologyRepository,
            ContentRevisionService contentRevisionService,
            MediaRepository mediaRepository, 
            ContentRevisionRepository contentRevisionRepository,
            AuditLogService auditLogService) 
    {

        this.projectRepository = projectRepository;
        this.projectMapper = projectMapper;
        this.technologyRepository = technologyRepository;
        this.contentRevisionService = contentRevisionService;
        this.mediaRepository = mediaRepository;
        this.contentRevisionRepository = contentRevisionRepository;
        this.auditLogService = auditLogService;
    }
    
    @Transactional(readOnly = true)
    public PageResponse<ProjectResponse> searchProjects(
            String search,
            ContentStatus status,
            Pageable pageable) {

        boolean hasSearch =
                search != null && !search.isBlank();

        Page<Project> projects;

        if (hasSearch && status != null) {

            projects =
                    projectRepository
                            .findByNameContainingIgnoreCaseAndStatus(
                                    search,
                                    status,
                                    pageable
                            );

        } else if (hasSearch) {

            projects =
                    projectRepository
                            .findByNameContainingIgnoreCase(
                                    search,
                                    pageable
                            );

        } else if (status != null) {

            projects =
                    projectRepository
                            .findByStatus(
                                    status,
                                    pageable
                            );

        } else {

            projects =
                    projectRepository.findAll(pageable);
        }

        return PageResponseMapper.map(
                projects,
                projectMapper::toResponse
        );
    }

    @Transactional(readOnly = true)
    public List<ProjectResponse> getAllProjects() {

        List<Project> projects =
                projectRepository.findAllByOrderByDisplayOrderAsc();

        return projects.stream()
                .map(projectMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public ProjectResponse getProjectById(Long id) {

        Project project =
                projectRepository.findById(id)
                        .orElseThrow(
                                () -> new ProjectNotFoundException(id)
                        );

        return projectMapper.toResponse(project);
    }

    @Transactional(readOnly = true)
    public ProjectResponse getProjectBySlug(String slug) {

        Project project =
                projectRepository.findBySlug(slug)
                        .orElseThrow(
                                () -> new ProjectNotFoundBySlugException(slug)
                        );

        return projectMapper.toResponse(project);
    }

    @Transactional
    public ProjectResponse saveProject(ProjectRequest request) {

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

        ProjectResponse response =
                projectMapper.toResponse(
                        savedProject
                );

        contentRevisionService.createRevision(
                "PROJECT",
                savedProject.getId(),
                savedProject.getStatus().name(),
                "system",
                response
        );
        
        
        auditLogService.log(
                AuditAction.CREATE,
                "PROJECT",
                savedProject.getId(),
                "Project created"
        );
        
        Media imageMedia = null;

        if (request.getImageMediaId() != null) {
            imageMedia = mediaRepository.findById(
                    request.getImageMediaId()
            ).orElseThrow(
                    () -> new MediaNotFoundException(
                            request.getImageMediaId()
                    )
            );
        }
        
        project.setImageMedia(imageMedia);

        return response;
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
        
        auditLogService.log(
                AuditAction.UPDATE,
                "PROJECT",
                existingProject.getId(),
                "Project updated"
        );

        /*
         * Every update is treated as a draft change.
         */
        existingProject.setStatus(
                ContentStatus.DRAFT
        );

        Project updatedProject =
                projectRepository.save(
                        existingProject
                );

        ProjectResponse response =
                projectMapper.toResponse(
                        updatedProject
                );

        contentRevisionService.createRevision(
                "PROJECT",
                updatedProject.getId(),
                ContentStatus.DRAFT.name(),
                "system",
                response
        );
        
        Media imageMedia = null;

        if (request.getImageMediaId() != null) {
            imageMedia = mediaRepository.findById(
                    request.getImageMediaId()
            ).orElseThrow(
                    () -> new MediaNotFoundException(
                            request.getImageMediaId()
                    )
            );
        }
        
        updatedProject.setImageMedia(imageMedia);

        return response;
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

    @Transactional(readOnly = true)
    public List<ProjectResponse> getPublishedProjects() {

        List<Project> projects =
                projectRepository
                        .findAllByPublishedRevisionIsNotNullOrderByDisplayOrderAsc();

        return projects.stream()
                .map(project ->
                        contentRevisionService
                                .getProjectResponseFromRevision(
                                        project.getPublishedRevision()
                                )
                )
                .toList();
    }

    @Transactional(readOnly = true)
    public ProjectResponse getPublishedProjectBySlug(
            String slug) {

        Project project =
                projectRepository.findBySlug(slug)
                        .orElseThrow(
                                () -> new ProjectNotFoundBySlugException(slug)
                        );

        if (project.getPublishedRevision() == null) {

            throw new ProjectNotFoundBySlugException(slug);
        }

        return contentRevisionService
                .getProjectResponseFromRevision(
                        project.getPublishedRevision()
                );
    }
    
    
    @Transactional
    public ProjectResponse publishProject(Long id) {

        // 1. Find the project
        Project project =
                projectRepository.findById(id)
                        .orElseThrow(
                                () -> new ProjectNotFoundException(id)
                        );

        // 2. Change the current project status to PUBLISHED
        project.setStatus(ContentStatus.PUBLISHED);

        // 3. Save the project
        Project publishedProject =
                projectRepository.save(project);

        // 4. Convert the published project into a response object
        ProjectResponse response =
                projectMapper.toResponse(publishedProject);

        // 5. Create a new PUBLISHED revision
        ContentRevision publishedRevision =
                contentRevisionService.createRevision(
                        "PROJECT",
                        publishedProject.getId(),
                        ContentStatus.PUBLISHED.name(),
                        "system",
                        response
                );
        
        auditLogService.log(
                AuditAction.PUBLISH,
                "PROJECT",
                id,
                "Project published"
        );

        // 6. Connect this published revision to the project
        publishedProject.setPublishedRevision(publishedRevision);

        // 7. Save the project again
        projectRepository.save(publishedProject);

        // 8. Return the published project
        return response;
    }

    
    @Transactional
    public ProjectResponse archiveProject(Long id) {

        // 1. Find the project
        Project project =
                projectRepository.findById(id)
                        .orElseThrow(
                                () -> new ProjectNotFoundException(id)
                        );

        // 2. Change status to ARCHIVED
        project.setStatus(ContentStatus.ARCHIVED);

        // 3. Remove the published revision
        project.setPublishedRevision(null);

        // 4. Save the project
        Project archivedProject =
                projectRepository.save(project);

        // 5. Convert to response
        ProjectResponse response =
                projectMapper.toResponse(archivedProject);

        // 6. Create an ARCHIVED revision
        contentRevisionService.createRevision(
                "PROJECT",
                archivedProject.getId(),
                ContentStatus.ARCHIVED.name(),
                "system",
                response
        );
        
        auditLogService.log(
                AuditAction.ARCHIVE,
                "PROJECT",
                id,
                "Project archived"
        );

        // 7. Return the archived project
        return response;
    }
    

    @Transactional
    public ProjectResponse unpublishProject(Long id) {

        // 1. Find the project
        Project project =
                projectRepository.findById(id)
                        .orElseThrow(
                                () -> new ProjectNotFoundException(id)
                        );

        // 2. Change project back to DRAFT
        project.setStatus(ContentStatus.DRAFT);

        // 3. Remove the published revision
        project.setPublishedRevision(null);

        // 4. Save the project
        Project unpublishedProject =
                projectRepository.save(project);

        // 5. Create a new DRAFT revision
        ProjectResponse response =
                projectMapper.toResponse(unpublishedProject);

        contentRevisionService.createRevision(
                "PROJECT",
                unpublishedProject.getId(),
                ContentStatus.DRAFT.name(),
                "system",
                response
        );
        
        auditLogService.log(
                AuditAction.UNPUBLISH,
                "PROJECT",
                id,
                "Project unpublished"
        );

        // 6. Return the project
        return response;
    }
    
    @Transactional
    public void publishSpecificRevision(
            Long projectId,
            Integer revisionVersion) {

        ContentRevision revision =
                contentRevisionRepository
                        .findByContentTypeAndContentIdAndVersionNumber(
                                "PROJECT",
                                projectId,
                                revisionVersion
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Project revision not found"
                                )
                        );

        if (!"DRAFT".equalsIgnoreCase(
                revision.getStatus())) {

            throw new RuntimeException(
                    "Only draft revisions can be published"
            );
        }

        Project project =
                projectRepository.findById(projectId)
                        .orElseThrow(() ->
                                new ProjectNotFoundException(projectId)
                        );

        revision.setStatus("PUBLISHED");

        project.setStatus(ContentStatus.PUBLISHED);
        project.setPublishedRevision(revision);

        contentRevisionRepository.save(revision);
        projectRepository.save(project);
    }

    
}