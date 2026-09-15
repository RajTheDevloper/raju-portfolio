package com.raju.portfolio.service;

import com.raju.portfolio.dto.media.MediaResponse;
import com.raju.portfolio.entity.Media;
import com.raju.portfolio.exception.MediaNotFoundException;
import com.raju.portfolio.exception.MediaStorageException;
import com.raju.portfolio.mapper.MediaMapper;
import com.raju.portfolio.repository.MediaRepository;
import com.raju.portfolio.service.storage.StorageService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class MediaService {

    private final MediaRepository mediaRepository;
    private final MediaMapper mediaMapper;
    private final StorageService storageService;

    public MediaService(
            MediaRepository mediaRepository,
            MediaMapper mediaMapper,
            StorageService storageService) {

        this.mediaRepository = mediaRepository;
        this.mediaMapper = mediaMapper;
        this.storageService = storageService;
    }

    public MediaResponse upload(
            MultipartFile file,
            String mediaType,
            String uploadedBy) {

        if (file == null || file.isEmpty()) {
            throw new MediaStorageException("File cannot be empty");
        }

        String originalFileName = file.getOriginalFilename();

        if (originalFileName == null || originalFileName.isBlank()) {
            throw new MediaStorageException(
                    "Original file name is missing"
            );
        }
        
        validateContentType(
                file.getContentType(),
                mediaType
        );

        String extension = getExtension(originalFileName);

        String storedFileName =
                UUID.randomUUID() + extension;

        try {

            String storagePath =
                    storageService.store(
                            file,
                            storedFileName
                    );

            Media media = new Media();

            media.setOriginalFileName(originalFileName);
            media.setStoredFileName(storedFileName);
            media.setContentType(
                    file.getContentType() != null
                            ? file.getContentType()
                            : "application/octet-stream"
            );
            media.setFileSize(file.getSize());
            media.setStoragePath(storagePath);
            media.setMediaType(mediaType);
            media.setUploadedAt(
                    java.time.LocalDateTime.now()
            );
            media.setUploadedBy(uploadedBy);

            Media savedMedia =
                    mediaRepository.save(media);

            return mediaMapper.toResponse(savedMedia);

        } catch (IOException exception) {

            throw new MediaStorageException(
                    "Failed to store file",
                    exception
            );
        }
    }

    @Transactional(readOnly = true)
    public MediaResponse getById(Long id) {

        Media media = mediaRepository.findById(id)
                .orElseThrow(
                        () -> new MediaNotFoundException(id)
                );

        return mediaMapper.toResponse(media);
    }

    @Transactional(readOnly = true)
    public List<MediaResponse> getAll() {

        return mediaRepository.findAll()
                .stream()
                .map(mediaMapper::toResponse)
                .toList();
    }

    public byte[] loadFile(Long id) {

        Media media = mediaRepository.findById(id)
                .orElseThrow(
                        () -> new MediaNotFoundException(id)
                );

        try {

            return storageService.load(
                    media.getStoragePath()
            );

        } catch (IOException exception) {

            throw new MediaStorageException(
                    "Failed to load media file",
                    exception
            );
        }
    }

    public void delete(Long id) {

        Media media = mediaRepository.findById(id)
                .orElseThrow(
                        () -> new MediaNotFoundException(id)
                );

        try {

            storageService.delete(
                    media.getStoragePath()
            );

            mediaRepository.delete(media);

        } catch (IOException exception) {

            throw new MediaStorageException(
                    "Failed to delete media file",
                    exception
            );
        }
    }

    private String getExtension(String fileName) {

        int lastDot = fileName.lastIndexOf('.');

        if (lastDot == -1) {
            return "";
        }

        return fileName.substring(lastDot);
    }
    
    private void validateContentType(
            String contentType,
            String mediaType) {

        if (contentType == null) {
            throw new MediaStorageException(
                    "File content type is missing"
            );
        }

        if ("PROFILE_IMAGE".equalsIgnoreCase(mediaType)
                || "PROJECT_IMAGE".equalsIgnoreCase(mediaType)) {

            if (!contentType.equals("image/jpeg")
                    && !contentType.equals("image/png")
                    && !contentType.equals("image/webp")) {

                throw new MediaStorageException(
                        "Only JPEG, PNG and WebP images are allowed"
                );
            }
        }

        if ("RESUME".equalsIgnoreCase(mediaType)) {

            if (!contentType.equals("application/pdf")) {

                throw new MediaStorageException(
                        "Only PDF files are allowed for resumes"
                );
            }
        }
    }
}