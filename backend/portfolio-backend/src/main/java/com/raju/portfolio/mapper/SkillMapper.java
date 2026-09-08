package com.raju.portfolio.mapper;

import org.springframework.stereotype.Component;

import com.raju.portfolio.dto.SkillRequest;
import com.raju.portfolio.dto.SkillResponse;
import com.raju.portfolio.entity.Skill;

@Component
public class SkillMapper {

    public Skill toEntity(
            SkillRequest request) {

        Skill skill = new Skill();

        skill.setName(request.getName());
        skill.setSlug(request.getSlug());
        skill.setCategory(request.getCategory());
        skill.setProficiency(request.getProficiency());
        skill.setYearsOfExperience(
                request.getYearsOfExperience()
        );
        skill.setDescription(request.getDescription());
        skill.setFeatured(request.isFeatured());
        skill.setDisplayOrder(
                request.getDisplayOrder()
        );

        return skill;
    }

    public void updateEntity(
            Skill skill,
            SkillRequest request) {

        skill.setName(request.getName());
        skill.setSlug(request.getSlug());
        skill.setCategory(request.getCategory());
        skill.setProficiency(request.getProficiency());
        skill.setYearsOfExperience(
                request.getYearsOfExperience()
        );
        skill.setDescription(request.getDescription());
        skill.setFeatured(request.isFeatured());
        skill.setDisplayOrder(
                request.getDisplayOrder()
        );
    }

    public SkillResponse toResponse(
            Skill skill) {

        SkillResponse response =
                new SkillResponse();

        response.setId(skill.getId());
        response.setName(skill.getName());
        response.setSlug(skill.getSlug());
        response.setCategory(skill.getCategory());
        response.setProficiency(
                skill.getProficiency()
        );
        response.setYearsOfExperience(
                skill.getYearsOfExperience()
        );
        response.setDescription(
                skill.getDescription()
        );
        response.setFeatured(
                skill.isFeatured()
        );
        response.setDisplayOrder(
                skill.getDisplayOrder()
        );
        response.setStatus(
                skill.getStatus().name()
        );

        return response;
    }
}