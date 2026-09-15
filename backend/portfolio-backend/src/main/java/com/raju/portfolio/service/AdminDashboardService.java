package com.raju.portfolio.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.raju.portfolio.dto.dashboard.AdminDashboardResponse;
import com.raju.portfolio.dto.dashboard.RecentRevisionResponse;
import com.raju.portfolio.entity.ContactMessageStatus;
import com.raju.portfolio.entity.ContentRevision;
import com.raju.portfolio.entity.ContentStatus;
import com.raju.portfolio.repository.ContactMessageRepository;
import com.raju.portfolio.repository.ContentRevisionRepository;
import com.raju.portfolio.repository.EducationRepository;
import com.raju.portfolio.repository.ExperienceRepository;
import com.raju.portfolio.repository.ProjectRepository;
import com.raju.portfolio.repository.ResumeRepository;
import com.raju.portfolio.repository.SkillRepository;

@Service
public class AdminDashboardService {

    private final ProjectRepository projectRepository;
    private final ExperienceRepository experienceRepository;
    private final EducationRepository educationRepository;
    private final SkillRepository skillRepository;
    private final ContactMessageRepository contactMessageRepository;
    private final ResumeRepository resumeRepository;
    private final ContentRevisionRepository contentRevisionRepository;

    public AdminDashboardService(
            ProjectRepository projectRepository,
            ExperienceRepository experienceRepository,
            EducationRepository educationRepository,
            SkillRepository skillRepository,
            ContactMessageRepository contactMessageRepository,
            ResumeRepository resumeRepository,
            ContentRevisionRepository contentRevisionRepository) {

        this.projectRepository = projectRepository;
        this.experienceRepository = experienceRepository;
        this.educationRepository = educationRepository;
        this.skillRepository = skillRepository;
        this.contactMessageRepository = contactMessageRepository;
        this.resumeRepository = resumeRepository;
        this.contentRevisionRepository = contentRevisionRepository;
    }

    @Transactional(readOnly = true)
    public AdminDashboardResponse getDashboard() {

        AdminDashboardResponse response = new AdminDashboardResponse();

        // ==========================================
        // PROJECTS
        // ==========================================

        long publishedProjects =
                projectRepository.countByStatus(ContentStatus.PUBLISHED);

        long draftProjects =
                projectRepository.countByStatus(ContentStatus.DRAFT);

        long archivedProjects =
                projectRepository.countByStatus(ContentStatus.ARCHIVED);

        response.setPublishedProjects(publishedProjects);
        response.setDraftProjects(draftProjects);
        response.setArchivedProjects(archivedProjects);
        response.setTotalProjects(
                publishedProjects + draftProjects + archivedProjects
        );

        // ==========================================
        // EXPERIENCE
        // ==========================================

        long publishedExperience =
                experienceRepository.countByStatus(ContentStatus.PUBLISHED);

        long draftExperience =
                experienceRepository.countByStatus(ContentStatus.DRAFT);

        long archivedExperience =
                experienceRepository.countByStatus(ContentStatus.ARCHIVED);

        response.setPublishedExperience(publishedExperience);
        response.setDraftExperience(draftExperience);
        response.setArchivedExperience(archivedExperience);
        response.setTotalExperience(
                publishedExperience + draftExperience + archivedExperience
        );

        // ==========================================
        // EDUCATION
        // ==========================================

        long publishedEducation =
                educationRepository.countByStatus(ContentStatus.PUBLISHED);

        long draftEducation =
                educationRepository.countByStatus(ContentStatus.DRAFT);

        long archivedEducation =
                educationRepository.countByStatus(ContentStatus.ARCHIVED);

        response.setPublishedEducation(publishedEducation);
        response.setDraftEducation(draftEducation);
        response.setArchivedEducation(archivedEducation);
        response.setTotalEducation(
                publishedEducation + draftEducation + archivedEducation
        );

        // ==========================================
        // SKILLS
        // ==========================================

        long publishedSkills =
                skillRepository.countByStatus(ContentStatus.PUBLISHED);

        long draftSkills =
                skillRepository.countByStatus(ContentStatus.DRAFT);

        long archivedSkills =
                skillRepository.countByStatus(ContentStatus.ARCHIVED);

        response.setPublishedSkills(publishedSkills);
        response.setDraftSkills(draftSkills);
        response.setArchivedSkills(archivedSkills);
        response.setTotalSkills(
                publishedSkills + draftSkills + archivedSkills
        );

        // ==========================================
        // CONTACT MESSAGES
        // ==========================================

        long unreadMessages =
                contactMessageRepository.countByStatus(
                        ContactMessageStatus.UNREAD);

        long readMessages =
                contactMessageRepository.countByStatus(
                        ContactMessageStatus.READ);

        long archivedMessages =
                contactMessageRepository.countByStatus(
                        ContactMessageStatus.ARCHIVED);

        response.setUnreadMessages(unreadMessages);
        response.setReadMessages(readMessages);
        response.setArchivedMessages(archivedMessages);
        response.setTotalMessages(
                unreadMessages + readMessages + archivedMessages
        );

        // ==========================================
        // RESUME
        // ==========================================

        response.setActiveResume(
                resumeRepository.findTopByActiveTrueOrderByUploadedAtDesc()
                        .isPresent()
        );

        // ==========================================
        // RECENT REVISIONS
        // ==========================================

        List<RecentRevisionResponse> recentRevisions =
                contentRevisionRepository
                        .findTop10ByOrderByCreatedAtDesc()
                        .stream()
                        .map(this::mapRevision)
                        .toList();

        response.setRecentRevisions(recentRevisions);

        return response;
    }

    private RecentRevisionResponse mapRevision(ContentRevision revision) {

        RecentRevisionResponse response =
                new RecentRevisionResponse();

        response.setId(revision.getId());
        response.setContentType(revision.getContentType());
        response.setContentId(revision.getContentId());
        response.setVersionNumber(revision.getVersionNumber());
        response.setStatus(revision.getStatus());
        response.setCreatedAt(revision.getCreatedAt());
        response.setCreatedBy(revision.getCreatedBy());

        return response;
    }
}