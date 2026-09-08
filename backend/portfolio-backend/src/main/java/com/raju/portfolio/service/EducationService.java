package com.raju.portfolio.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.raju.portfolio.dto.EducationRequest;
import com.raju.portfolio.dto.EducationResponse;
import com.raju.portfolio.entity.Education;
import com.raju.portfolio.entity.ContentStatus;
import com.raju.portfolio.exception.EducationNotFoundException;
import com.raju.portfolio.mapper.EducationMapper;
import com.raju.portfolio.repository.EducationRepository;

@Service
public class EducationService {

    private final EducationRepository educationRepository;
    private final EducationMapper educationMapper;

    public EducationService(
            EducationRepository educationRepository,
            EducationMapper educationMapper) {

        this.educationRepository = educationRepository;
        this.educationMapper = educationMapper;
    }

    @Transactional(readOnly = true)
    public List<EducationResponse> getAllEducations() {

        return educationRepository
                .findAllByOrderByDisplayOrderAsc()
                .stream()
                .map(educationMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public EducationResponse getEducationById(Long id) {

        Education education =
                educationRepository.findById(id)
                        .orElseThrow(() ->
                                new EducationNotFoundException(id)
                        );

        return educationMapper.toResponse(education);
    }

    @Transactional
    public EducationResponse createEducation(
            EducationRequest request) {

        validateDates(request);

        Education education =
                educationMapper.toEntity(request);

        education.setStatus(
                ContentStatus.DRAFT
        );

        Education savedEducation =
                educationRepository.save(education);

        return educationMapper.toResponse(
                savedEducation
        );
    }

    @Transactional
    public EducationResponse updateEducation(
            Long id,
            EducationRequest request) {

        validateDates(request);

        Education education =
                educationRepository.findById(id)
                        .orElseThrow(() ->
                                new EducationNotFoundException(id)
                        );

        educationMapper.updateEntity(
                education,
                request
        );

        Education updatedEducation =
                educationRepository.save(education);

        return educationMapper.toResponse(
                updatedEducation
        );
    }

    @Transactional
    public void deleteEducation(Long id) {

        Education education =
                educationRepository.findById(id)
                        .orElseThrow(() ->
                                new EducationNotFoundException(id)
                        );

        educationRepository.delete(education);
    }

    @Transactional(readOnly = true)
    public List<EducationResponse>
            getPublishedEducations() {

        return educationRepository
                .findAllByStatusOrderByDisplayOrderAsc(
                        ContentStatus.PUBLISHED
                )
                .stream()
                .map(educationMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public EducationResponse
            getPublishedEducationById(Long id) {

        Education education =
                educationRepository
                        .findByIdAndStatus(
                                id,
                                ContentStatus.PUBLISHED
                        )
                        .orElseThrow(() ->
                                new EducationNotFoundException(id)
                        );

        return educationMapper.toResponse(
                education
        );
    }

    @Transactional
    public EducationResponse publishEducation(
            Long id) {

        Education education =
                educationRepository.findById(id)
                        .orElseThrow(() ->
                                new EducationNotFoundException(id)
                        );

        education.setStatus(
                ContentStatus.PUBLISHED
        );

        return educationMapper.toResponse(
                educationRepository.save(education)
        );
    }

    @Transactional
    public EducationResponse unpublishEducation(
            Long id) {

        Education education =
                educationRepository.findById(id)
                        .orElseThrow(() ->
                                new EducationNotFoundException(id)
                        );

        education.setStatus(
                ContentStatus.DRAFT
        );

        return educationMapper.toResponse(
                educationRepository.save(education)
        );
    }

    @Transactional
    public EducationResponse archiveEducation(
            Long id) {

        Education education =
                educationRepository.findById(id)
                        .orElseThrow(() ->
                                new EducationNotFoundException(id)
                        );

        education.setStatus(
                ContentStatus.ARCHIVED
        );

        return educationMapper.toResponse(
                educationRepository.save(education)
        );
    }

    private void validateDates(
            EducationRequest request) {

        if (request.isCurrent()
                && request.getEndDate() != null) {

            throw new IllegalArgumentException(
                    "Current education cannot have an end date"
            );
        }

        if (!request.isCurrent()
                && request.getEndDate() == null) {

            throw new IllegalArgumentException(
                    "Non-current education must have an end date"
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