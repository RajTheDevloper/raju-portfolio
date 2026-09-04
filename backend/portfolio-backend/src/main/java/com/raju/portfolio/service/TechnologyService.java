package com.raju.portfolio.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.raju.portfolio.dto.TechnologyRequest;
import com.raju.portfolio.dto.TechnologyResponse;
import com.raju.portfolio.entity.Technology;
import com.raju.portfolio.exception.DuplicateTechnologySlugException;
import com.raju.portfolio.exception.TechnologyNotFoundBySlugException;
import com.raju.portfolio.exception.TechnologyNotFoundException;
import com.raju.portfolio.mapper.TechnologyMapper;
import com.raju.portfolio.repository.TechnologyRepository;

@Service
public class TechnologyService {

    private final TechnologyRepository technologyRepository;
    private final TechnologyMapper technologyMapper;

    public TechnologyService(
            TechnologyRepository technologyRepository,
            TechnologyMapper technologyMapper) {

        this.technologyRepository = technologyRepository;
        this.technologyMapper = technologyMapper;
    }

    public List<TechnologyResponse> getAllTechnologies() {

        List<Technology> technologies =
                technologyRepository.findAll();

        return technologies.stream()
                .map(technologyMapper::toResponse)
                .toList();
    }

    public TechnologyResponse getTechnologyById(
            Long id) {

        Technology technology =
                technologyRepository.findById(id)
                        .orElseThrow(
                                () -> new TechnologyNotFoundException(id)
                        );

        return technologyMapper.toResponse(technology);
    }

    public TechnologyResponse getTechnologyBySlug(
            String slug) {

        Technology technology =
                technologyRepository.findBySlug(slug)
                        .orElseThrow(
                                () -> new TechnologyNotFoundBySlugException(slug)
                        );

        return technologyMapper.toResponse(technology);
    }

    public TechnologyResponse saveTechnology(
            TechnologyRequest request) {

        if (technologyRepository.existsBySlug(
                request.getSlug())) {

            throw new DuplicateTechnologySlugException(
                    request.getSlug()
            );
        }

        Technology technology =
                technologyMapper.toEntity(request);

        Technology savedTechnology =
                technologyRepository.save(technology);

        return technologyMapper.toResponse(
                savedTechnology
        );
    }

    public TechnologyResponse updateTechnology(
            Long id,
            TechnologyRequest request) {

        Technology existingTechnology =
                technologyRepository.findById(id)
                        .orElseThrow(
                                () -> new TechnologyNotFoundException(id)
                        );

        if (technologyRepository.existsBySlugAndIdNot(
                request.getSlug(),
                id)) {

            throw new DuplicateTechnologySlugException(
                    request.getSlug()
            );
        }

        technologyMapper.updateEntity(
                existingTechnology,
                request
        );

        Technology updatedTechnology =
                technologyRepository.save(
                        existingTechnology
                );

        return technologyMapper.toResponse(
                updatedTechnology
        );
    }

    public void deleteTechnology(Long id) {

        Technology existingTechnology =
                technologyRepository.findById(id)
                        .orElseThrow(
                                () -> new TechnologyNotFoundException(id)
                        );

        technologyRepository.delete(
                existingTechnology
        );
    }
}