package com.environment.service;

import com.environment.model.Notification;
import com.environment.repository.NotificationRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class NotificationService {
    private final NotificationRepository repo;

    public NotificationService(NotificationRepository repo) { this.repo = repo; }

    public Notification createNotification(Long userId, String msg) {
        Notification n = Notification.builder().userId(userId).message(msg).timestamp(Instant.now()).readFlag(false).build();
        return repo.save(n);
    }

    public List<Notification> getNotifications(Long userId) {
        return repo.findByUserIdOrderByTimestampDesc(userId);
    }

	public void createNotificationForAdmins(String string) {
		// TODO Auto-generated method stub
		
	}

	public void notifyUser(Long id, String string) {
		// TODO Auto-generated method stub
		
	}
}
