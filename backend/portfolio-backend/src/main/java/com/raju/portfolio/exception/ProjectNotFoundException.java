package com.raju.portfolio.exception;

public class ProjectNotFoundException extends RuntimeException {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public ProjectNotFoundException(Long id) {
        super("Project not found with id: " + id);
    }
}