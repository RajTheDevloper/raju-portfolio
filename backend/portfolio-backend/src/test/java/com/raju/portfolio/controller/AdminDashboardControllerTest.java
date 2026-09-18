package com.raju.portfolio.controller;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.raju.portfolio.dto.dashboard.AdminDashboardResponse;
import com.raju.portfolio.security.CustomUserDetailsService;
import com.raju.portfolio.security.JwtService;
import com.raju.portfolio.service.AdminDashboardService;

@WebMvcTest(AdminDashboardController.class)
class AdminDashboardControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private AdminDashboardService adminDashboardService;

    @MockitoBean
    private JwtService jwtService;

    @MockitoBean
    private CustomUserDetailsService customUserDetailsService;

    @Test
    void getDashboard_shouldReturn200() throws Exception {

        AdminDashboardResponse response =
                new AdminDashboardResponse();

        when(adminDashboardService.getDashboard())
                .thenReturn(response);

        mockMvc.perform(
                get("/api/admin/dashboard")
            )
            .andExpect(status().isOk());
    }
}
