package com.raju.portfolio.mapper;

import org.springframework.stereotype.Component;

import com.raju.portfolio.dto.ResumeRequest;
import com.raju.portfolio.dto.ResumeResponse;
import com.raju.portfolio.entity.Resume;

@Component
public class ResumeMapper {

    public Resume toEntity(ResumeRequest request) {

        Resume resume = new Resume();

        resume.setFileName(request.getFileName());
        resume.setFileUrl(request.getFileUrl());
        resume.setFileType(request.getFileType());
        resume.setFileSize(request.getFileSize());

        return resume;
    }

    public ResumeResponse toResponse(Resume resume) {

        ResumeResponse response = new ResumeResponse();

        response.setId(resume.getId());
        response.setFileName(resume.getFileName());
        response.setFileUrl(resume.getFileUrl());
        response.setFileType(resume.getFileType());
        response.setFileSize(resume.getFileSize());
        response.setUploadedAt(resume.getUploadedAt());
        response.setUploadedBy(resume.getUploadedBy());
        response.setActive(resume.isActive());

        return response;
    }
}
