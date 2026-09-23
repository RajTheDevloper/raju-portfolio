-- ============================================================
-- V8: Create education table
-- ============================================================

CREATE TABLE education (

    id BIGSERIAL PRIMARY KEY,

    institution_name VARCHAR(200) NOT NULL,

    degree VARCHAR(200) NOT NULL,

    field_of_study VARCHAR(200),

    location VARCHAR(200),

    start_date DATE NOT NULL,

    end_date DATE,

    current BOOLEAN NOT NULL DEFAULT FALSE,

    description VARCHAR(2000),

    display_order INTEGER NOT NULL DEFAULT 0,

    status VARCHAR(20) NOT NULL DEFAULT 'DRAFT'

);