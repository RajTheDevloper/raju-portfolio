package com.raju.portfolio.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.raju.portfolio.dto.ExperienceRequest;
import com.raju.portfolio.dto.ExperienceResponse;
import com.raju.portfolio.entity.Experience;
import com.raju.portfolio.entity.ContentStatus;
import com.raju.portfolio.exception.ExperienceNotFoundException;
import com.raju.portfolio.mapper.ExperienceMapper;
import com.raju.portfolio.repository.ExperienceRepository;

@Service
public class ExperienceService {

    private final ExperienceRepository experienceRepository;
    private final ExperienceMapper experienceMapper;

    public ExperienceService(
            ExperienceRepository experienceRepository,
            ExperienceMapper experienceMapper) {

        this.experienceRepository = experienceRepository;
        this.experienceMapper = experienceMapper;
    }

    @Transactional(readOnly = true)
    public List<ExperienceResponse> getAllExperiences() {

        return experienceRepository
                .findAllByOrderByDisplayOrderAsc()
                .stream()
                .map(experienceMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public ExperienceResponse getExperienceById(Long id) {

        Experience experience =
                experienceRepository.findById(id)
                        .orElseThrow(() ->
                                new ExperienceNotFoundException(id)
                        );

        return experienceMapper.toResponse(experience);
    }

    @Transactional
    public ExperienceResponse createExperience(
            ExperienceRequest request) {

        validateDates(request);

        Experience experience =
                experienceMapper.toEntity(request);

        experience.setStatus(ContentStatus.DRAFT);

        Experience savedExperience =
                experienceRepository.save(experience);

        return experienceMapper.toResponse(savedExperience);
    }

    @Transactional
    public ExperienceResponse updateExperience(
            Long id,
            ExperienceRequest request) {

        validateDates(request);

        Experience experience =
                experienceRepository.findById(id)
                        .orElseThrow(() ->
                                new ExperienceNotFoundException(id)
                        );

        experienceMapper.updateEntity(
                experience,
                request
        );

        Experience updatedExperience =
                experienceRepository.save(experience);

        return experienceMapper.toResponse(
                updatedExperience
        );
    }

    @Transactional
    public void deleteExperience(Long id) {

        Experience experience =
                experienceRepository.findById(id)
                        .orElseThrow(() ->
                                new ExperienceNotFoundException(id)
                        );

        experienceRepository.delete(experience);
    }

    @Transactional(readOnly = true)
    public List<ExperienceResponse> getPublishedExperiences() {

        return experienceRepository
                .findAllByStatusOrderByDisplayOrderAsc(
                        ContentStatus.PUBLISHED
                )
                .stream()
                .map(experienceMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public ExperienceResponse getPublishedExperienceById(
            Long id) {

        Experience experience =
                experienceRepository
                        .findByIdAndStatus(
                                id,
                                ContentStatus.PUBLISHED
                        )
                        .orElseThrow(() ->
                                new ExperienceNotFoundException(id)
                        );

        return experienceMapper.toResponse(experience);
    }
    
    @Transactional
    public ExperienceResponse publishExperience(Long id) {

        Experience experience =
                experienceRepository.findById(id)
                        .orElseThrow(() ->
                                new ExperienceNotFoundException(id)
                        );

        experience.setStatus(ContentStatus.PUBLISHED);

        Experience publishedExperience =
                experienceRepository.save(experience);

        return experienceMapper.toResponse(
                publishedExperience
        );
    }
    
    @Transactional
    public ExperienceResponse archiveExperience(Long id) {

        Experience experience =
                experienceRepository.findById(id)
                        .orElseThrow(() ->
                                new ExperienceNotFoundException(id)
                        );

        experience.setStatus(ContentStatus.ARCHIVED);

        Experience archivedExperience =
                experienceRepository.save(experience);

        return experienceMapper.toResponse(
                archivedExperience
        );
    }
    
    @Transactional
    public ExperienceResponse unpublishExperience(Long id) {

        Experience experience =
                experienceRepository.findById(id)
                        .orElseThrow(() ->
                                new ExperienceNotFoundException(id)
                        );

        experience.setStatus(ContentStatus.DRAFT);

        Experience unpublishedExperience =
                experienceRepository.save(experience);

        return experienceMapper.toResponse(
                unpublishedExperience
        );
    }

    private void validateDates(
            ExperienceRequest request) {

        if (request.isCurrent()
                && request.getEndDate() != null) {

            throw new IllegalArgumentException(
                    "Current experience cannot have an end date"
            );
        }

        if (!request.isCurrent()
                && request.getEndDate() == null) {

            throw new IllegalArgumentException(
                    "Non-current experience must have an end date"
            );
        }

        if (request.getEndDate() != null
                && request.getStartDate() != null
                && request.getEndDate()
                        .isBefore(request.getStartDate())) {

            throw new IllegalArgumentException(
                    "End date cannot be before start date"
            );
        }
    }
}