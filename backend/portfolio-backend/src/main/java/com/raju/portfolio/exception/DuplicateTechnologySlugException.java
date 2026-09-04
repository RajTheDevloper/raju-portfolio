package com.raju.portfolio.exception;

public class DuplicateTechnologySlugException
        extends RuntimeException {

    /**
	     * 
	     */
	    private static final long serialVersionUID = 1L;

	public DuplicateTechnologySlugException(String slug) {
        super("Technology slug already exists: " + slug);
    }
}