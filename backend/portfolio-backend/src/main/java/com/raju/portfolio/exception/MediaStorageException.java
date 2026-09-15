package com.raju.portfolio.exception;

public class MediaStorageException extends RuntimeException {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public MediaStorageException(String message, Throwable cause) {
        super(message, cause);
    }

    public MediaStorageException(String message) {
        super(message);
    }
}