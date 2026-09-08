package com.raju.portfolio.exception;

public class SkillNotFoundException
        extends RuntimeException {

    /**
	     * 
	     */
	    private static final long serialVersionUID = 1L;

	public SkillNotFoundException(Long id) {
        super("Skill not found with id: " + id);
    }

    public SkillNotFoundException(String slug) {
        super("Skill not found with slug: " + slug);
    }
}