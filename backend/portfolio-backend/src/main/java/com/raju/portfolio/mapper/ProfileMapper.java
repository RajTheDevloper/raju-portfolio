package com.raju.portfolio.mapper;

import org.springframework.stereotype.Component;

import com.raju.portfolio.dto.ProfileRequest;
import com.raju.portfolio.dto.ProfileResponse;
import com.raju.portfolio.entity.Profile;

@Component
public class ProfileMapper {

    public Profile toEntity(ProfileRequest request) {

        Profile profile = new Profile();

        profile.setName(request.getName());
        profile.setTitle(request.getTitle());
        profile.setAbout(request.getAbout());
        profile.setEmail(request.getEmail());
        profile.setLocation(request.getLocation());
        profile.setGithubUrl(request.getGithubUrl());
        profile.setLinkedinUrl(request.getLinkedinUrl());

        return profile;
    }

    public ProfileResponse toResponse(Profile profile) {

        ProfileResponse response = new ProfileResponse();

        response.setId(profile.getId());
        response.setName(profile.getName());
        response.setTitle(profile.getTitle());
        response.setAbout(profile.getAbout());
        response.setEmail(profile.getEmail());
        response.setLocation(profile.getLocation());
        response.setGithubUrl(profile.getGithubUrl());
        response.setLinkedinUrl(profile.getLinkedinUrl());

        return response;
    }
}