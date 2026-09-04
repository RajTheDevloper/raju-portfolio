package com.raju.portfolio.exception;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ProfileNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleProfileNotFound(
            ProfileNotFoundException exception,
            WebRequest request) {

        ApiErrorResponse errorResponse =
                new ApiErrorResponse(
                        HttpStatus.NOT_FOUND.value(),
                        exception.getMessage(),
                        Map.of(),
                        LocalDateTime.now(),
                        getRequestPath(request)
                );

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(errorResponse);
    }
    
    @ExceptionHandler(ProjectNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleProjectNotFound(
            ProjectNotFoundException exception,
            WebRequest request) {

        ApiErrorResponse errorResponse =
                new ApiErrorResponse(
                        HttpStatus.NOT_FOUND.value(),
                        exception.getMessage(),
                        Map.of(),
                        LocalDateTime.now(),
                        getRequestPath(request)
                );

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(errorResponse);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiErrorResponse> handleValidationErrors(
            MethodArgumentNotValidException exception,
            WebRequest request) {

        Map<String, String> errors = new LinkedHashMap<>();

        exception.getBindingResult()
                .getFieldErrors()
                .forEach(error ->
                        errors.put(
                                error.getField(),
                                error.getDefaultMessage()
                        )
                );

        ApiErrorResponse errorResponse =
                new ApiErrorResponse(
                        HttpStatus.BAD_REQUEST.value(),
                        "Validation failed",
                        errors,
                        LocalDateTime.now(),
                        getRequestPath(request)
                );

        return ResponseEntity
                .badRequest()
                .body(errorResponse);
    }

    private String getRequestPath(WebRequest request) {

        return request
                .getDescription(false)
                .replace("uri=", "");
    }
}