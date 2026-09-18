package com.raju.portfolio.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.raju.portfolio.security.CustomUserDetailsService;
import com.raju.portfolio.security.JwtService;
import com.raju.portfolio.service.ContentRevisionService;
import com.raju.portfolio.service.ProjectService;

@WebMvcTest(AdminProjectController.class)
class AdminProjectControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ProjectService projectService;

    @MockitoBean
    private ContentRevisionService contentRevisionService;

    @MockitoBean
    private JwtService jwtService;

    @MockitoBean
    private CustomUserDetailsService customUserDetailsService;

    @Test
    void createProject_shouldReturn400_whenRequestIsInvalid()
            throws Exception {

        String invalidJson = """
            {
                "name": "",
                "slug": ""
            }
            """;

        mockMvc.perform(
                post("/api/admin/projects")
                    .contentType("application/json")
                    .content(invalidJson)
            )
            .andExpect(status().isBadRequest());
    }
}
