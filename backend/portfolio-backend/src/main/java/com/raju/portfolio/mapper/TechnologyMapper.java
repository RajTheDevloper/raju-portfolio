package com.raju.portfolio.mapper;

import org.springframework.stereotype.Component;

import com.raju.portfolio.dto.TechnologyRequest;
import com.raju.portfolio.dto.TechnologyResponse;
import com.raju.portfolio.entity.Technology;

@Component
public class TechnologyMapper {

    public Technology toEntity(
            TechnologyRequest request) {

        Technology technology = new Technology();

        updateEntity(
                technology,
                request
        );

        return technology;
    }

    public void updateEntity(
            Technology technology,
            TechnologyRequest request) {

        technology.setName(request.getName());
        technology.setSlug(request.getSlug());
    }

    public TechnologyResponse toResponse(
            Technology technology) {

        TechnologyResponse response =
                new TechnologyResponse();

        response.setId(technology.getId());
        response.setName(technology.getName());
        response.setSlug(technology.getSlug());

        return response;
    }
}