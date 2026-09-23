-- ============================================================
-- V11: Create site settings table
-- ============================================================

CREATE TABLE site_settings (

    id BIGSERIAL PRIMARY KEY,

    site_name VARCHAR(150) NOT NULL,

    tagline VARCHAR(300),

    site_description VARCHAR(1000),

    contact_email VARCHAR(200),

    github_url VARCHAR(500),

    linkedin_url VARCHAR(500),

    twitter_url VARCHAR(500),

    footer_text VARCHAR(500),

    seo_title VARCHAR(200),

    seo_description VARCHAR(500),

    maintenance_mode BOOLEAN NOT NULL DEFAULT FALSE

);