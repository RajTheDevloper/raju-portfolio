package com.raju.portfolio.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.raju.portfolio.entity.ContactMessage;
import com.raju.portfolio.entity.ContactMessageStatus;

public interface ContactMessageRepository
        extends JpaRepository<ContactMessage, Long> {

    List<ContactMessage>
    findAllByOrderByCreatedAtDesc();

    List<ContactMessage>
    findAllByStatusOrderByCreatedAtDesc(
            ContactMessageStatus status);

    long countByStatus(
            ContactMessageStatus status);
}
