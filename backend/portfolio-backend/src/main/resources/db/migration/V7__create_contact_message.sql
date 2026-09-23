-- ============================================================
-- V7: Create contact message table
-- ============================================================

CREATE TABLE contact_message (

    id BIGSERIAL PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    email VARCHAR(200) NOT NULL,

    subject VARCHAR(200),

    message VARCHAR(5000) NOT NULL,

    status VARCHAR(20) NOT NULL DEFAULT 'UNREAD',

    created_at TIMESTAMP NOT NULL,

    updated_at TIMESTAMP

);