package com.raju.portfolio.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.raju.portfolio.dto.ResumeRequest;
import com.raju.portfolio.dto.ResumeResponse;
import com.raju.portfolio.entity.Resume;
import com.raju.portfolio.mapper.ResumeMapper;
import com.raju.portfolio.repository.ResumeRepository;

@Service
public class ResumeService {

    private final ResumeRepository resumeRepository;
    private final ResumeMapper resumeMapper;

    public ResumeService(
            ResumeRepository resumeRepository,
            ResumeMapper resumeMapper) {

        this.resumeRepository = resumeRepository;
        this.resumeMapper = resumeMapper;
    }

    @Transactional(readOnly = true)
    public ResumeResponse getActiveResume() {

        Resume resume =
                resumeRepository
                        .findTopByActiveTrueOrderByUploadedAtDesc()
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "No active resume found"
                                )
                        );

        return resumeMapper.toResponse(resume);
    }

    @Transactional(readOnly = true)
    public List<ResumeResponse> getAllResumes() {

        return resumeRepository
                .findAllByOrderByUploadedAtDesc()
                .stream()
                .map(resumeMapper::toResponse)
                .toList();
    }

    @Transactional
    public ResumeResponse createResume(
            ResumeRequest request) {

        // Deactivate existing resumes
        List<Resume> existingResumes =
                resumeRepository.findAll();

        existingResumes.forEach(
                resume -> resume.setActive(false)
        );

        resumeRepository.saveAll(existingResumes);

        // Create new resume
        Resume resume =
                resumeMapper.toEntity(request);

        resume.setUploadedAt(
                LocalDateTime.now()
        );

        resume.setUploadedBy("system");
        resume.setActive(true);

        Resume savedResume =
                resumeRepository.save(resume);

        return resumeMapper.toResponse(savedResume);
    }

    @Transactional
    public ResumeResponse updateResume(
            Long id,
            ResumeRequest request) {

        Resume resume =
                resumeRepository.findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Resume not found with id: " + id
                                )
                        );

        resume.setFileName(request.getFileName());
        resume.setFileUrl(request.getFileUrl());
        resume.setFileType(request.getFileType());
        resume.setFileSize(request.getFileSize());

        Resume updatedResume =
                resumeRepository.save(resume);

        return resumeMapper.toResponse(updatedResume);
    }

    @Transactional
    public void deleteResume(Long id) {

        Resume resume =
                resumeRepository.findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Resume not found with id: " + id
                                )
                        );

        resume.setActive(false);

        resumeRepository.save(resume);
    }
}
