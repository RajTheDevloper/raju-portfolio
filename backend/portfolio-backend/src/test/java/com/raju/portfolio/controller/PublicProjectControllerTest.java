package com.raju.portfolio.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import com.raju.portfolio.security.CustomUserDetailsService;


import com.raju.portfolio.security.JwtService;
import com.raju.portfolio.service.ProjectService;

@WebMvcTest(PublicProjectController.class)
class PublicProjectControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ProjectService projectService;
    
    @MockitoBean
    private JwtService jwtService;
    
    @MockitoBean
    private CustomUserDetailsService customUserDetailsService;

    @Test
    void getProjects_shouldReturn200() throws Exception {

        mockMvc.perform(
                get("/api/public/projects")
            )
            .andExpect(status().isOk());
    }

    @Test
    void publicProjects_shouldBeAccessibleWithoutAuthentication()
            throws Exception {

        mockMvc.perform(
                get("/api/public/projects")
            )
            .andExpect(status().isOk());
    }
}