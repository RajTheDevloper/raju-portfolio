CREATE TABLE scheduled_publication (
    id BIGSERIAL PRIMARY KEY,
    content_type VARCHAR(50) NOT NULL,
    content_id BIGINT NOT NULL,
    revision_version INTEGER NOT NULL,
    scheduled_at TIMESTAMP NOT NULL,
    status VARCHAR(20) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    created_by VARCHAR(100)
);