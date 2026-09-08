package com.raju.portfolio.mapper;

import org.springframework.stereotype.Component;

import com.raju.portfolio.dto.ProfileRequest;
import com.raju.portfolio.dto.ProfileResponse;
import com.raju.portfolio.entity.Profile;

@Component
public class ProfileMapper {

    public Profile toEntity(ProfileRequest request) {

        Profile profile = new Profile();

        updateEntity(profile, request);

        return profile;
    }

    public void updateEntity(
            Profile profile,
            ProfileRequest request) {

        profile.setName(request.getName());
        profile.setTitle(request.getTitle());
        profile.setShortBio(request.getShortBio());
        profile.setAbout(request.getAbout());
        profile.setEmail(request.getEmail());
        profile.setPhone(request.getPhone());
        profile.setLocation(request.getLocation());
        profile.setGithubUrl(request.getGithubUrl());
        profile.setLinkedinUrl(request.getLinkedinUrl());
        profile.setProfileImageUrl(request.getProfileImageUrl());
        profile.setResumeUrl(request.getResumeUrl());
        profile.setAvailability(request.getAvailability());
        profile.setSeoTitle(request.getSeoTitle());
        profile.setSeoDescription(request.getSeoDescription());
    }

    public ProfileResponse toResponse(Profile profile) {

        ProfileResponse response =
                new ProfileResponse();

        response.setId(profile.getId());
        response.setName(profile.getName());
        response.setTitle(profile.getTitle());
        response.setShortBio(profile.getShortBio());
        response.setAbout(profile.getAbout());
        response.setEmail(profile.getEmail());
        response.setPhone(profile.getPhone());
        response.setLocation(profile.getLocation());
        response.setGithubUrl(profile.getGithubUrl());
        response.setLinkedinUrl(profile.getLinkedinUrl());
        response.setProfileImageUrl(
                profile.getProfileImageUrl()
        );
        response.setResumeUrl(profile.getResumeUrl());
        response.setAvailability(
                profile.getAvailability()
        );
        response.setSeoTitle(profile.getSeoTitle());
        response.setSeoDescription(
                profile.getSeoDescription()
        );

        return response;
    }
}