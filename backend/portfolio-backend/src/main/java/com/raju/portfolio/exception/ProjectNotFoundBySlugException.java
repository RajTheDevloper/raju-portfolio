package com.raju.portfolio.exception;

public class ProjectNotFoundBySlugException extends RuntimeException {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public ProjectNotFoundBySlugException(String slug) {
        super("Project not found with slug: " + slug);
    }
}