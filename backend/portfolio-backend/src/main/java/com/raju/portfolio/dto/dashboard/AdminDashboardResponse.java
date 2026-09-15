package com.raju.portfolio.dto.dashboard;

import java.util.List;

public class AdminDashboardResponse {

    // Projects
    private long totalProjects;
    private long publishedProjects;
    private long draftProjects;
    private long archivedProjects;

    // Experience
    private long totalExperience;
    private long publishedExperience;
    private long draftExperience;
    private long archivedExperience;

    // Education
    private long totalEducation;
    private long publishedEducation;
    private long draftEducation;
    private long archivedEducation;

    // Skills
    private long totalSkills;
    private long publishedSkills;
    private long draftSkills;
    private long archivedSkills;

    // Messages
    private long totalMessages;
    private long unreadMessages;
    private long readMessages;
    private long archivedMessages;

    // Resume
    private boolean activeResume;

    // Recent revisions
    private List<RecentRevisionResponse> recentRevisions;

    public AdminDashboardResponse() {
    }

    public long getTotalProjects() {
        return totalProjects;
    }

    public void setTotalProjects(long totalProjects) {
        this.totalProjects = totalProjects;
    }

    public long getPublishedProjects() {
        return publishedProjects;
    }

    public void setPublishedProjects(long publishedProjects) {
        this.publishedProjects = publishedProjects;
    }

    public long getDraftProjects() {
        return draftProjects;
    }

    public void setDraftProjects(long draftProjects) {
        this.draftProjects = draftProjects;
    }

    public long getArchivedProjects() {
        return archivedProjects;
    }

    public void setArchivedProjects(long archivedProjects) {
        this.archivedProjects = archivedProjects;
    }

    public long getTotalExperience() {
        return totalExperience;
    }

    public void setTotalExperience(long totalExperience) {
        this.totalExperience = totalExperience;
    }

    public long getPublishedExperience() {
        return publishedExperience;
    }

    public void setPublishedExperience(long publishedExperience) {
        this.publishedExperience = publishedExperience;
    }

    public long getDraftExperience() {
        return draftExperience;
    }

    public void setDraftExperience(long draftExperience) {
        this.draftExperience = draftExperience;
    }

    public long getArchivedExperience() {
        return archivedExperience;
    }

    public void setArchivedExperience(long archivedExperience) {
        this.archivedExperience = archivedExperience;
    }

    public long getTotalEducation() {
        return totalEducation;
    }

    public void setTotalEducation(long totalEducation) {
        this.totalEducation = totalEducation;
    }

    public long getPublishedEducation() {
        return publishedEducation;
    }

    public void setPublishedEducation(long publishedEducation) {
        this.publishedEducation = publishedEducation;
    }

    public long getDraftEducation() {
        return draftEducation;
    }

    public void setDraftEducation(long draftEducation) {
        this.draftEducation = draftEducation;
    }

    public long getArchivedEducation() {
        return archivedEducation;
    }

    public void setArchivedEducation(long archivedEducation) {
        this.archivedEducation = archivedEducation;
    }

    public long getTotalSkills() {
        return totalSkills;
    }

    public void setTotalSkills(long totalSkills) {
        this.totalSkills = totalSkills;
    }

    public long getPublishedSkills() {
        return publishedSkills;
    }

    public void setPublishedSkills(long publishedSkills) {
        this.publishedSkills = publishedSkills;
    }

    public long getDraftSkills() {
        return draftSkills;
    }

    public void setDraftSkills(long draftSkills) {
        this.draftSkills = draftSkills;
    }

    public long getArchivedSkills() {
        return archivedSkills;
    }

    public void setArchivedSkills(long archivedSkills) {
        this.archivedSkills = archivedSkills;
    }

    public long getTotalMessages() {
        return totalMessages;
    }

    public void setTotalMessages(long totalMessages) {
        this.totalMessages = totalMessages;
    }

    public long getUnreadMessages() {
        return unreadMessages;
    }

    public void setUnreadMessages(long unreadMessages) {
        this.unreadMessages = unreadMessages;
    }

    public long getReadMessages() {
        return readMessages;
    }

    public void setReadMessages(long readMessages) {
        this.readMessages = readMessages;
    }

    public long getArchivedMessages() {
        return archivedMessages;
    }

    public void setArchivedMessages(long archivedMessages) {
        this.archivedMessages = archivedMessages;
    }

    public boolean isActiveResume() {
        return activeResume;
    }

    public void setActiveResume(boolean activeResume) {
        this.activeResume = activeResume;
    }

    public List<RecentRevisionResponse> getRecentRevisions() {
        return recentRevisions;
    }

    public void setRecentRevisions(List<RecentRevisionResponse> recentRevisions) {
        this.recentRevisions = recentRevisions;
    }
}