package com.raju.portfolio.exception;

public class DuplicateProjectSlugException extends RuntimeException {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public DuplicateProjectSlugException(String slug) {
        super("Project slug already exists: " + slug);
    }
}