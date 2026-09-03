package com.raju.portfolio.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.raju.portfolio.dto.ProfileRequest;
import com.raju.portfolio.dto.ProfileResponse;
import com.raju.portfolio.entity.Profile;
import com.raju.portfolio.exception.ProfileNotFoundException;
import com.raju.portfolio.mapper.ProfileMapper;
import com.raju.portfolio.repository.ProfileRepository;

@Service
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final ProfileMapper profileMapper;

    public ProfileService(
            ProfileRepository profileRepository,
            ProfileMapper profileMapper) {

        this.profileRepository = profileRepository;
        this.profileMapper = profileMapper;
    }

    public List<ProfileResponse> getAllProfiles() {

        List<Profile> profiles =
                profileRepository.findAll();

        return profiles.stream()
                .map(profileMapper::toResponse)
                .toList();
    }

    public ProfileResponse getProfileById(Long id) {

        Profile profile = profileRepository.findById(id)
                .orElseThrow(() -> new ProfileNotFoundException(id));

        return profileMapper.toResponse(profile);
    }

    public ProfileResponse saveProfile(ProfileRequest request) {

        Profile profile =
                profileMapper.toEntity(request);

        Profile savedProfile =
                profileRepository.save(profile);

        return profileMapper.toResponse(savedProfile);
    }

    public ProfileResponse updateProfile(
            Long id,
            ProfileRequest request) {

        Profile existingProfile =
                profileRepository.findById(id)
                        .orElseThrow(
                                () -> new ProfileNotFoundException(id)
                        );

        profileMapper.updateEntity(
                existingProfile,
                request
        );

        Profile updatedProfile =
                profileRepository.save(existingProfile);

        return profileMapper.toResponse(updatedProfile);
    }

    public void deleteProfile(Long id) {

        Profile existingProfile =
                profileRepository.findById(id)
                        .orElseThrow(
                                () -> new ProfileNotFoundException(id)
                        );

        profileRepository.delete(existingProfile);
    }
}