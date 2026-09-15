package com.raju.portfolio.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

@Configuration
public class OpenApiConfig {

	@Bean
	public OpenAPI portfolioOpenAPI() {

	    return new OpenAPI()
	            .info(new Info()
	                    .title("Raju Portfolio API")
	                    .description(
	                            "REST API for the Raju Portfolio CMS. "
	                            + "Provides public portfolio content and "
	                            + "authenticated administrative operations."
	                    )
	                    .version("1.0.0")
	                    .contact(new Contact()
	                            .name("Raju B")
	                            .email("raju@gmail.com")))
	            .components(
	                    new Components()
	                            .addSecuritySchemes(
	                                    "bearerAuth",
	                                    new SecurityScheme()
	                                            .type(SecurityScheme.Type.HTTP)
	                                            .scheme("bearer")
	                                            .bearerFormat("JWT")
	                            )
	            )
	            .addSecurityItem(
	                    new SecurityRequirement()
	                        .addList("bearerAuth")
	                );
	}
}