package com.raju.portfolio.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    
    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }
    
    

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    	
    	http
        .csrf(csrf -> csrf.disable())
        .cors(cors -> {})
        .headers(headers -> headers
            .contentTypeOptions(contentTypeOptions -> {})
            .frameOptions(frameOptions -> frameOptions.sameOrigin())
        )
        .sessionManagement(session ->
            session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        );

        http
            // JWT APIs do not use browser sessions
            .csrf(csrf -> csrf.disable())

            // Enable CORS configuration
            .cors(cors -> {})

            // Do not create HTTP sessions
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            .authorizeHttpRequests(auth -> auth

                // -----------------------------
                // Public GET APIs
                // -----------------------------
                .requestMatchers(
                    HttpMethod.GET,
                    "/api/public/**"
                ).permitAll()

                // -----------------------------
                // Public contact form
                // -----------------------------
                .requestMatchers(
                    HttpMethod.POST,
                    "/api/public/contact"
                ).permitAll()

                // -----------------------------
                // Authentication
                // -----------------------------
                .requestMatchers("/api/auth/**").permitAll()

                // -----------------------------
                // Health
                // -----------------------------
                .requestMatchers("/api/health").permitAll()

                // -----------------------------
                // Swagger
                // -----------------------------
                .requestMatchers(
                    "/swagger-ui/**",
                    "/swagger-ui.html",
                    "/v3/api-docs/**"
                ).permitAll()

                // -----------------------------
                // Admin APIs
                // -----------------------------
                .requestMatchers("/api/admin/**")
                .hasRole("ADMIN")

                // -----------------------------
                // Everything else
                // -----------------------------
                .anyRequest()
                .authenticated()
            )

            // JWT authentication happens before
            // Spring's username/password filter
            .addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration)
            throws Exception {

        return configuration.getAuthenticationManager();
    }
    
}