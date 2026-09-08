package com.raju.portfolio.exception;

public class ExperienceNotFoundException
        extends RuntimeException {

    /**
	     * 
	     */
	    private static final long serialVersionUID = 1L;

	public ExperienceNotFoundException(Long id) {

        super("Experience not found with id: " + id);
    }
}