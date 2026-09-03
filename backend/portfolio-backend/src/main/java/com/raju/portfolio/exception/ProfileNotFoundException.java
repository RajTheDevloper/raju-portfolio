package com.raju.portfolio.exception;

public class ProfileNotFoundException extends RuntimeException {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public ProfileNotFoundException(Long id) {
        super("Profile not found with id: " + id);
    }
}