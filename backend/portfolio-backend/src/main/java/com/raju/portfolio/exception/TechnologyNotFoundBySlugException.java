package com.raju.portfolio.exception;

public class TechnologyNotFoundBySlugException
        extends RuntimeException {

    /**
	     * 
	     */
	    private static final long serialVersionUID = 1L;

	public TechnologyNotFoundBySlugException(String slug) {
        super("Technology not found with slug: " + slug);
    }
}