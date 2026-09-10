package com.raju.portfolio.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.raju.portfolio.dto.ContactMessageRequest;
import com.raju.portfolio.dto.ContactMessageResponse;
import com.raju.portfolio.entity.ContactMessage;
import com.raju.portfolio.entity.ContactMessageStatus;
import com.raju.portfolio.mapper.ContactMessageMapper;
import com.raju.portfolio.repository.ContactMessageRepository;

@Service
public class ContactMessageService {

    private final ContactMessageRepository contactMessageRepository;
    private final ContactMessageMapper contactMessageMapper;

    public ContactMessageService(
            ContactMessageRepository contactMessageRepository,
            ContactMessageMapper contactMessageMapper) {

        this.contactMessageRepository =
                contactMessageRepository;

        this.contactMessageMapper =
                contactMessageMapper;
    }

    @Transactional
    public ContactMessageResponse createMessage(
            ContactMessageRequest request) {

        ContactMessage message =
                contactMessageMapper.toEntity(request);

        message.setStatus(
                ContactMessageStatus.UNREAD
        );

        message.setCreatedAt(
                LocalDateTime.now()
        );

        ContactMessage savedMessage =
                contactMessageRepository.save(message);

        return contactMessageMapper.toResponse(
                savedMessage
        );
    }

    @Transactional(readOnly = true)
    public List<ContactMessageResponse> getAllMessages() {

        return contactMessageRepository
                .findAllByOrderByCreatedAtDesc()
                .stream()
                .map(contactMessageMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ContactMessageResponse> getMessagesByStatus(
            ContactMessageStatus status) {

        return contactMessageRepository
                .findAllByStatusOrderByCreatedAtDesc(status)
                .stream()
                .map(contactMessageMapper::toResponse)
                .toList();
    }

    @Transactional
    public ContactMessageResponse markAsRead(Long id) {

        ContactMessage message =
                findMessage(id);

        message.setStatus(
                ContactMessageStatus.READ
        );

        message.setUpdatedAt(
                LocalDateTime.now()
        );

        return contactMessageMapper.toResponse(
                contactMessageRepository.save(message)
        );
    }

    @Transactional
    public ContactMessageResponse markAsUnread(Long id) {

        ContactMessage message =
                findMessage(id);

        message.setStatus(
                ContactMessageStatus.UNREAD
        );

        message.setUpdatedAt(
                LocalDateTime.now()
        );

        return contactMessageMapper.toResponse(
                contactMessageRepository.save(message)
        );
    }

    @Transactional
    public ContactMessageResponse archiveMessage(Long id) {

        ContactMessage message =
                findMessage(id);

        message.setStatus(
                ContactMessageStatus.ARCHIVED
        );

        message.setUpdatedAt(
                LocalDateTime.now()
        );

        return contactMessageMapper.toResponse(
                contactMessageRepository.save(message)
        );
    }

    @Transactional
    public void deleteMessage(Long id) {

        ContactMessage message =
                findMessage(id);

        contactMessageRepository.delete(message);
    }

    @Transactional(readOnly = true)
    public long getUnreadCount() {

        return contactMessageRepository.countByStatus(
                ContactMessageStatus.UNREAD
        );
    }

    private ContactMessage findMessage(Long id) {

        return contactMessageRepository
                .findById(id)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Contact message not found with id: "
                                        + id
                        )
                );
    }
}
