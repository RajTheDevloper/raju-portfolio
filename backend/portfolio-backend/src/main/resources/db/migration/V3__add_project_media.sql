ALTER TABLE project
ADD COLUMN image_media_id BIGINT;

ALTER TABLE project
ADD CONSTRAINT fk_project_image_media
FOREIGN KEY (image_media_id)
REFERENCES media(id);