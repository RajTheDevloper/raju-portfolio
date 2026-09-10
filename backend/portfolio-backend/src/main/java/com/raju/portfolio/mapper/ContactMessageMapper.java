package com.raju.portfolio.mapper;

import org.springframework.stereotype.Component;

import com.raju.portfolio.dto.ContactMessageRequest;
import com.raju.portfolio.dto.ContactMessageResponse;
import com.raju.portfolio.entity.ContactMessage;

@Component
public class ContactMessageMapper {

    public ContactMessage toEntity(
            ContactMessageRequest request) {

        ContactMessage message =
                new ContactMessage();

        message.setName(request.getName());
        message.setEmail(request.getEmail());
        message.setSubject(request.getSubject());
        message.setMessage(request.getMessage());

        return message;
    }

    public ContactMessageResponse toResponse(
            ContactMessage message) {

        ContactMessageResponse response =
                new ContactMessageResponse();

        response.setId(message.getId());
        response.setName(message.getName());
        response.setEmail(message.getEmail());
        response.setSubject(message.getSubject());
        response.setMessage(message.getMessage());
        response.setStatus(message.getStatus());
        response.setCreatedAt(message.getCreatedAt());
        response.setUpdatedAt(message.getUpdatedAt());

        return response;
    }
}
