package com.raju.portfolio.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.raju.portfolio.dto.SkillRequest;
import com.raju.portfolio.dto.SkillResponse;
import com.raju.portfolio.entity.ContentStatus;
import com.raju.portfolio.entity.Skill;
import com.raju.portfolio.exception.SkillNotFoundException;
import com.raju.portfolio.mapper.SkillMapper;
import com.raju.portfolio.repository.SkillRepository;

@Service
public class SkillService {

    private final SkillRepository skillRepository;
    private final SkillMapper skillMapper;

    public SkillService(
            SkillRepository skillRepository,
            SkillMapper skillMapper) {

        this.skillRepository = skillRepository;
        this.skillMapper = skillMapper;
    }

    @Transactional(readOnly = true)
    public List<SkillResponse> getAllSkills() {

        return skillRepository
                .findAllByOrderByDisplayOrderAsc()
                .stream()
                .map(skillMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public SkillResponse getSkillById(Long id) {

        Skill skill =
                skillRepository.findById(id)
                        .orElseThrow(() ->
                                new SkillNotFoundException(id)
                        );

        return skillMapper.toResponse(skill);
    }

    @Transactional(readOnly = true)
    public SkillResponse getSkillBySlug(
            String slug) {

        Skill skill =
                skillRepository.findBySlug(slug)
                        .orElseThrow(() ->
                                new SkillNotFoundException(slug)
                        );

        return skillMapper.toResponse(skill);
    }

    @Transactional
    public SkillResponse createSkill(
            SkillRequest request) {

        if (skillRepository.existsBySlug(
                request.getSlug())) {

            throw new IllegalArgumentException(
                    "A skill with this slug already exists"
            );
        }

        Skill skill =
                skillMapper.toEntity(request);

        skill.setStatus(
                ContentStatus.DRAFT
        );

        Skill savedSkill =
                skillRepository.save(skill);

        return skillMapper.toResponse(
                savedSkill
        );
    }

    @Transactional
    public SkillResponse updateSkill(
            Long id,
            SkillRequest request) {

        if (skillRepository.existsBySlugAndIdNot(
                request.getSlug(),
                id)) {

            throw new IllegalArgumentException(
                    "A skill with this slug already exists"
            );
        }

        Skill skill =
                skillRepository.findById(id)
                        .orElseThrow(() ->
                                new SkillNotFoundException(id)
                        );

        skillMapper.updateEntity(
                skill,
                request
        );

        Skill updatedSkill =
                skillRepository.save(skill);

        return skillMapper.toResponse(
                updatedSkill
        );
    }

    @Transactional
    public void deleteSkill(Long id) {

        Skill skill =
                skillRepository.findById(id)
                        .orElseThrow(() ->
                                new SkillNotFoundException(id)
                        );

        skillRepository.delete(skill);
    }

    @Transactional(readOnly = true)
    public List<SkillResponse>
            getPublishedSkills() {

        return skillRepository
                .findAllByStatusOrderByDisplayOrderAsc(
                        ContentStatus.PUBLISHED
                )
                .stream()
                .map(skillMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<SkillResponse>
            getFeaturedSkills() {

        return skillRepository
                .findAllByStatusAndFeaturedTrueOrderByDisplayOrderAsc(
                        ContentStatus.PUBLISHED
                )
                .stream()
                .map(skillMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public SkillResponse
            getPublishedSkillBySlug(
                    String slug) {

        Skill skill =
                skillRepository.findBySlug(slug)
                        .orElseThrow(() ->
                                new SkillNotFoundException(slug)
                        );

        if (skill.getStatus()
                != ContentStatus.PUBLISHED) {

            throw new SkillNotFoundException(slug);
        }

        return skillMapper.toResponse(skill);
    }

    @Transactional
    public SkillResponse publishSkill(
            Long id) {

        Skill skill =
                skillRepository.findById(id)
                        .orElseThrow(() ->
                                new SkillNotFoundException(id)
                        );

        skill.setStatus(
                ContentStatus.PUBLISHED
        );

        return skillMapper.toResponse(
                skillRepository.save(skill)
        );
    }

    @Transactional
    public SkillResponse unpublishSkill(
            Long id) {

        Skill skill =
                skillRepository.findById(id)
                        .orElseThrow(() ->
                                new SkillNotFoundException(id)
                        );

        skill.setStatus(
                ContentStatus.DRAFT
        );

        return skillMapper.toResponse(
                skillRepository.save(skill)
        );
    }

    @Transactional
    public SkillResponse archiveSkill(
            Long id) {

        Skill skill =
                skillRepository.findById(id)
                        .orElseThrow(() ->
                                new SkillNotFoundException(id)
                        );

        skill.setStatus(
                ContentStatus.ARCHIVED
        );

        return skillMapper.toResponse(
                skillRepository.save(skill)
        );
    }
}