-- ============================================================
-- V9: Create experience table
-- ============================================================

CREATE TABLE experience (

    id BIGSERIAL PRIMARY KEY,

    company_name VARCHAR(200) NOT NULL,

    job_title VARCHAR(200) NOT NULL,

    location VARCHAR(200),

    employment_type VARCHAR(50),

    start_date DATE NOT NULL,

    end_date DATE,

    current BOOLEAN NOT NULL DEFAULT FALSE,

    description VARCHAR(2000),

    responsibilities VARCHAR(5000),

    display_order INTEGER NOT NULL DEFAULT 0,

    status VARCHAR(20) NOT NULL DEFAULT 'DRAFT'

);