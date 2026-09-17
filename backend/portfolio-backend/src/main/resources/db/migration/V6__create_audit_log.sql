CREATE TABLE audit_log (
    id BIGSERIAL PRIMARY KEY,
    action VARCHAR(30) NOT NULL,
    content_type VARCHAR(50) NOT NULL,
    content_id BIGINT NOT NULL,
    username VARCHAR(100),
    created_at TIMESTAMP NOT NULL,
    description VARCHAR(500)
);