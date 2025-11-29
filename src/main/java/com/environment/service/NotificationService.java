package com.environment.service;

import com.environment.model.Notification;
import com.environment.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository repo;

    public Notification create(Long userId, String message) {
        Notification n = Notification.builder()
                .userId(userId)
                .message(message)
                .createdAt(Instant.now())
                .readFlag(false)
                .build();
        return repo.save(n);
    }

    public List<Notification> forUser(Long userId) {
        return repo.findByUserIdOrderByCreatedAtDesc(userId);
    }
}
