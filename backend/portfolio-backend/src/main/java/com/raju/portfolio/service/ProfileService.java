package com.raju.portfolio.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.raju.portfolio.dto.ProfileRequest;
import com.raju.portfolio.dto.ProfileResponse;
import com.raju.portfolio.entity.Profile;
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

    @Transactional(readOnly = true)
    public ProfileResponse getProfile() {

        Profile profile =
                profileRepository.findTopByOrderByIdAsc()
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Profile not configured"
                                )
                        );

        return profileMapper.toResponse(profile);
    }

    @Transactional
    public ProfileResponse updateProfile(
            ProfileRequest request) {

        Profile profile =
                profileRepository.findTopByOrderByIdAsc()
                        .orElseGet(Profile::new);

        profileMapper.updateEntity(
                profile,
                request
        );

        Profile savedProfile =
                profileRepository.save(profile);

        return profileMapper.toResponse(
                savedProfile
        );
    }
}