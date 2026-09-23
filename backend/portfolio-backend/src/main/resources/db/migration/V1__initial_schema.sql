-- ============================================================
-- V1: Initial database schema
-- ============================================================

-- ------------------------------------------------------------
-- Profile
-- ------------------------------------------------------------
CREATE TABLE profile (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    title VARCHAR(200) NOT NULL,
    short_bio VARCHAR(500),
    about VARCHAR(5000),
    email VARCHAR(200) NOT NULL,
    phone VARCHAR(30),
    location VARCHAR(200),
    github_url VARCHAR(500),
    linkedin_url VARCHAR(500),
    profile_image_url VARCHAR(500),
    resume_url VARCHAR(500),
    availability VARCHAR(100) NOT NULL,
    seo_title VARCHAR(200),
    seo_description VARCHAR(500)
);

-- ------------------------------------------------------------
-- Technology
-- ------------------------------------------------------------
CREATE TABLE technology (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE
);

-- ------------------------------------------------------------
-- Admin user
-- ------------------------------------------------------------
CREATE TABLE admin_user (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(200) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    enabled BOOLEAN NOT NULL DEFAULT TRUE
);

-- ------------------------------------------------------------
-- Content revision
-- ------------------------------------------------------------
CREATE TABLE content_revision (
    id BIGSERIAL PRIMARY KEY,
    content_type VARCHAR(50) NOT NULL,
    content_id BIGINT NOT NULL,
    version_number INTEGER NOT NULL,
    status VARCHAR(20) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    created_by VARCHAR(100),
    snapshot TEXT
);

-- ------------------------------------------------------------
-- Project
-- ------------------------------------------------------------
CREATE TABLE project (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255),
    slug VARCHAR(200) NOT NULL UNIQUE,
    description VARCHAR(255),
    github_url VARCHAR(255),
    live_url VARCHAR(255),
    image_url VARCHAR(255),
    featured BOOLEAN NOT NULL DEFAULT FALSE,
    display_order INTEGER,
    status VARCHAR(20) NOT NULL DEFAULT 'DRAFT',
    published_revision_id BIGINT,

    CONSTRAINT fk_project_published_revision
        FOREIGN KEY (published_revision_id)
        REFERENCES content_revision(id)
);

-- ------------------------------------------------------------
-- Project <-> Technology many-to-many relationship
-- ------------------------------------------------------------
CREATE TABLE project_technology (
    project_id BIGINT NOT NULL,
    technology_id BIGINT NOT NULL,

    PRIMARY KEY (project_id, technology_id),

    CONSTRAINT fk_project_technology_project
        FOREIGN KEY (project_id)
        REFERENCES project(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_project_technology_technology
        FOREIGN KEY (technology_id)
        REFERENCES technology(id)
        ON DELETE CASCADE
);