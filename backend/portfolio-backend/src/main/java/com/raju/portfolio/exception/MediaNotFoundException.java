package com.raju.portfolio.exception;

public class MediaNotFoundException extends RuntimeException {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public MediaNotFoundException(Long id) {
        super("Media not found with id: " + id);
    }
}