-- ============================================================
-- V12: Create skill table
-- ============================================================

CREATE TABLE skill (

    id BIGSERIAL PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    slug VARCHAR(100) NOT NULL UNIQUE,

    category VARCHAR(100) NOT NULL,

    proficiency VARCHAR(30) NOT NULL,

    years_of_experience INTEGER NOT NULL DEFAULT 0,

    description VARCHAR(1000),

    featured BOOLEAN NOT NULL DEFAULT FALSE,

    display_order INTEGER NOT NULL DEFAULT 0,

    status VARCHAR(20) NOT NULL DEFAULT 'DRAFT'

);