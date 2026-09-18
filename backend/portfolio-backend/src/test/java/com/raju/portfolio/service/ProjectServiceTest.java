package com.raju.portfolio.service;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.request;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.raju.portfolio.dto.ProjectRequest;
import com.raju.portfolio.dto.ProjectResponse;
import com.raju.portfolio.entity.Project;
import com.raju.portfolio.exception.DuplicateProjectSlugException;
import com.raju.portfolio.exception.ProjectNotFoundException;
import com.raju.portfolio.mapper.ProjectMapper;
import com.raju.portfolio.repository.ProjectRepository;
import com.raju.portfolio.repository.TechnologyRepository;

class ProjectServiceTest {

    @Mock
    private ProjectRepository projectRepository;

    @Mock
    private ProjectMapper projectMapper;

    @Mock
    private TechnologyRepository technologyRepository;

    @Mock
    private ContentRevisionService contentRevisionService;

    @InjectMocks
    private ProjectService projectService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }
    
    
    @Test
    void getProjectById_shouldThrowException_whenProjectDoesNotExist() {

        Long projectId = 999L;

        when(projectRepository.findById(projectId))
            .thenReturn(java.util.Optional.empty());

        assertThrows(
            ProjectNotFoundException.class,
            () -> projectService.getProjectById(projectId)
        );

        verify(projectRepository)
            .findById(projectId);
    }
    
    @Test
    void getProjectById_shouldReturnProject_whenProjectExists() {

        Long projectId = 1L;

        Project project = new Project();
        project.setId(projectId);
        project.setName("Portfolio Website");

        ProjectResponse response = new ProjectResponse();
        response.setId(projectId);
        response.setName("Portfolio Website");

        when(projectRepository.findById(projectId))
            .thenReturn(java.util.Optional.of(project));

        when(projectMapper.toResponse(project))
            .thenReturn(response);

        ProjectResponse result =
            projectService.getProjectById(projectId);

        assertNotNull(result);
        assertEquals(projectId, result.getId());
        assertEquals("Portfolio Website", result.getName());

        verify(projectRepository)
            .findById(projectId);

        verify(projectMapper)
            .toResponse(project);
    }
    
    @Test
    void createProject_shouldThrowException_whenSlugAlreadyExists() {

        ProjectRequest request = new ProjectRequest();

        request.setName("My Portfolio");
        request.setSlug("my-portfolio");

        when(projectRepository.existsBySlug("my-portfolio"))
            .thenReturn(true);

        assertThrows(
            DuplicateProjectSlugException.class,
            () -> projectService.saveProject(request)
        );

        verify(projectRepository)
            .existsBySlug("my-portfolio");
    }

}