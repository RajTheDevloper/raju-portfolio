package com.raju.portfolio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.raju.portfolio.entity.Profile;

public interface ProfileRepository extends JpaRepository<Profile, Long>{

}
