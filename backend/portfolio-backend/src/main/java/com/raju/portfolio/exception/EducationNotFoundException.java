package com.raju.portfolio.exception;

public class EducationNotFoundException
        extends RuntimeException {

    /**
	     * 
	     */
	    private static final long serialVersionUID = 1L;

	public EducationNotFoundException(Long id) {
        super("Education not found with id: " + id);
    }
}