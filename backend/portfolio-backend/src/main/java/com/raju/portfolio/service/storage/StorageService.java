package com.raju.portfolio.service.storage;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface StorageService {

    String store(MultipartFile file, String storedFileName) throws IOException;

    byte[] load(String storagePath) throws IOException;

    void delete(String storagePath) throws IOException;
}