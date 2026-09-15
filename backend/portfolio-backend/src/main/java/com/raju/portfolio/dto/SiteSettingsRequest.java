package com.raju.portfolio.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class SiteSettingsRequest {

    @NotBlank(message = "Site name is required")
    @Size(max = 150, message = "Site name must not exceed 150 characters")
    private String siteName;

    @Size(max = 300, message = "Tagline must not exceed 300 characters")
    private String tagline;

    @Size(max = 1000, message = "Site description must not exceed 1000 characters")
    private String siteDescription;

    @Email(message = "Please provide a valid contact email")
    @Size(max = 200, message = "Contact email must not exceed 200 characters")
    private String contactEmail;

    @Pattern(
        regexp = "^$|https?://.*$",
        message = "GitHub URL must start with http:// or https://"
    )
    private String githubUrl;

    @Pattern(
        regexp = "^$|https?://.*$",
        message = "LinkedIn URL must start with http:// or https://"
    )
    private String linkedinUrl;

    @Pattern(
        regexp = "^$|https?://.*$",
        message = "Twitter URL must start with http:// or https://"
    )
    private String twitterUrl;

    @Size(max = 500, message = "Footer text must not exceed 500 characters")
    private String footerText;

    @Size(max = 200, message = "SEO title must not exceed 200 characters")
    private String seoTitle;

    @Size(max = 500, message = "SEO description must not exceed 500 characters")
    private String seoDescription;

    private boolean maintenanceMode;

    public SiteSettingsRequest() {
    }

    public String getSiteName() {
        return siteName;
    }

    public void setSiteName(String siteName) {
        this.siteName = siteName;
    }

    public String getTagline() {
        return tagline;
    }

    public void setTagline(String tagline) {
        this.tagline = tagline;
    }

    public String getSiteDescription() {
        return siteDescription;
    }

    public void setSiteDescription(String siteDescription) {
        this.siteDescription = siteDescription;
    }

    public String getContactEmail() {
        return contactEmail;
    }

    public void setContactEmail(String contactEmail) {
        this.contactEmail = contactEmail;
    }

    public String getGithubUrl() {
        return githubUrl;
    }

    public void setGithubUrl(String githubUrl) {
        this.githubUrl = githubUrl;
    }

    public String getLinkedinUrl() {
        return linkedinUrl;
    }

    public void setLinkedinUrl(String linkedinUrl) {
        this.linkedinUrl = linkedinUrl;
    }

    public String getTwitterUrl() {
        return twitterUrl;
    }

    public void setTwitterUrl(String twitterUrl) {
        this.twitterUrl = twitterUrl;
    }

    public String getFooterText() {
        return footerText;
    }

    public void setFooterText(String footerText) {
        this.footerText = footerText;
    }

    public String getSeoTitle() {
        return seoTitle;
    }

    public void setSeoTitle(String seoTitle) {
        this.seoTitle = seoTitle;
    }

    public String getSeoDescription() {
        return seoDescription;
    }

    public void setSeoDescription(String seoDescription) {
        this.seoDescription = seoDescription;
    }

    public boolean isMaintenanceMode() {
        return maintenanceMode;
    }

    public void setMaintenanceMode(boolean maintenanceMode) {
        this.maintenanceMode = maintenanceMode;
    }
}
