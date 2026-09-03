package com.raju.portfolio.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
//it will tell spring that this java class contains the REST API end points.
public class HealthController {
	
	@GetMapping("/api/health")
	public String health() {
		return "Portfolio backend is running";
	}

}
