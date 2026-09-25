package com.raju.portfolio.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter) {

        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http
            // We are using JWT, so we don't need CSRF protection
            .csrf(csrf -> csrf.disable())

            // Enable CORS using CorsConfig
            .cors(cors -> {})

            // Security headers
            .headers(headers -> headers
                .contentTypeOptions(contentTypeOptions -> {})
                .frameOptions(frameOptions -> frameOptions.sameOrigin())
            )

            // Do not create HTTP sessions
            .sessionManagement(session ->
                session.sessionCreationPolicy(
                    SessionCreationPolicy.STATELESS
                )
            )

            // Authorization rules
            .authorizeHttpRequests(auth -> auth
            		
            	// Spring Boot error handling	
            	.requestMatchers("/error").permitAll()

                // ---------------------------------
                // Public GET APIs
                // ---------------------------------
                .requestMatchers(
                    HttpMethod.GET,
                    "/api/public/**"
                ).permitAll()

                // ---------------------------------
                // Public contact form
                // ---------------------------------
                .requestMatchers(
                    HttpMethod.POST,
                    "/api/public/contact"
                ).permitAll()

                // ---------------------------------
                // Authentication
                // ---------------------------------
                .requestMatchers(
                    "/api/auth/**"
                ).permitAll()

                // ---------------------------------
                // Health check
                // ---------------------------------
                .requestMatchers(
                    "/api/health"
                ).permitAll()

                // ---------------------------------
                // Swagger
                // ---------------------------------
                .requestMatchers(
                    "/swagger-ui/**",
                    "/swagger-ui.html",
                    "/v3/api-docs/**"
                ).permitAll()

                // ---------------------------------
                // Admin APIs
                // ---------------------------------
                .requestMatchers(
                    "/api/admin/**"
                ).hasRole("ADMIN")

                // ---------------------------------
                // Everything else
                // ---------------------------------
                .anyRequest().authenticated()
            )

            // Run JWT authentication before
            // Spring's username/password authentication filter
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