package com.raju.portfolio.service.storage;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class LocalStorageService implements StorageService {

    private final Path rootLocation;

    public LocalStorageService(
            @Value("${app.storage.local-path:uploads}") String storagePath) {

        this.rootLocation = Paths.get(storagePath)
                .toAbsolutePath()
                .normalize();

        try {
            Files.createDirectories(this.rootLocation);
        } catch (IOException exception) {
            throw new RuntimeException(
                    "Could not initialize storage directory",
                    exception
            );
        }
    }

    @Override
    public String store(
            MultipartFile file,
            String storedFileName) throws IOException {

        Path targetLocation = rootLocation.resolve(storedFileName)
                .normalize();

        if (!targetLocation.startsWith(rootLocation)) {
            throw new IOException("Invalid file path");
        }

        Files.copy(
                file.getInputStream(),
                targetLocation
        );

        return rootLocation.relativize(targetLocation)
                .toString()
                .replace("\\", "/");
    }

    @Override
    public byte[] load(String storagePath) throws IOException {

        Path fileLocation = rootLocation.resolve(storagePath)
                .normalize();

        if (!fileLocation.startsWith(rootLocation)) {
            throw new IOException("Invalid file path");
        }

        return Files.readAllBytes(fileLocation);
    }

    @Override
    public void delete(String storagePath) throws IOException {

        Path fileLocation = rootLocation.resolve(storagePath)
                .normalize();

        if (!fileLocation.startsWith(rootLocation)) {
            throw new IOException("Invalid file path");
        }

        Files.deleteIfExists(fileLocation);
    }
}