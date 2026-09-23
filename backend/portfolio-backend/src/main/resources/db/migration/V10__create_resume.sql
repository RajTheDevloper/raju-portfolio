-- ============================================================
-- V10: Create resume table
-- ============================================================

CREATE TABLE resume (

    id BIGSERIAL PRIMARY KEY,

    file_name VARCHAR(200) NOT NULL,

    file_url VARCHAR(500) NOT NULL,

    file_type VARCHAR(50),

    file_size BIGINT,

    uploaded_at TIMESTAMP NOT NULL,

    uploaded_by VARCHAR(100),

    active BOOLEAN NOT NULL DEFAULT TRUE

);