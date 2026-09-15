package com.raju.portfolio.dto.media;

public class MediaFileResponse {

    private byte[] content;
    private String contentType;
    private String originalFileName;
    private long fileSize;

    public MediaFileResponse() {
    }

    public MediaFileResponse(
            byte[] content,
            String contentType,
            String originalFileName,
            long fileSize) {

        this.content = content;
        this.contentType = contentType;
        this.originalFileName = originalFileName;
        this.fileSize = fileSize;
    }

    public byte[] getContent() {
        return content;
    }

    public void setContent(byte[] content) {
        this.content = content;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public String getOriginalFileName() {
        return originalFileName;
    }

    public void setOriginalFileName(String originalFileName) {
        this.originalFileName = originalFileName;
    }

    public long getFileSize() {
        return fileSize;
    }

    public void setFileSize(long fileSize) {
        this.fileSize = fileSize;
    }
}
