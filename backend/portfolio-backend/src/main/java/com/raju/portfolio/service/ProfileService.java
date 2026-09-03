package com.raju.portfolio.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.raju.portfolio.entity.Profile;
import com.raju.portfolio.repository.ProfileRepository;

@Service
public class ProfileService {

    private final ProfileRepository profileRepository;

    public ProfileService(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    public List<Profile> getAllProfiles() {
        return profileRepository.findAll();
    }

    public Profile getProfileById(Long id) {
        return profileRepository.findById(id).orElse(null);
    }

    public Profile saveProfile(Profile profile) {
        return profileRepository.save(profile);
    }

    public void deleteProfile(Long id) {
        profileRepository.deleteById(id);
    }
}