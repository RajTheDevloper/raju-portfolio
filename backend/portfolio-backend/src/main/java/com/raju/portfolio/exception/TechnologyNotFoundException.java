package com.raju.portfolio.exception;

public class TechnologyNotFoundException
        extends RuntimeException {

    /**
	     * 
	     */
	    private static final long serialVersionUID = 1L;

	public TechnologyNotFoundException(Long id) {
        super("Technology not found with id: " + id);
    }
}