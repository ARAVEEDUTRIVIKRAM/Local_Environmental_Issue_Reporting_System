package com.environment.controller;

import com.environment.model.Notification;
import com.environment.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService service;

    @GetMapping
    public ResponseEntity<List<Notification>> myNotifications(Authentication auth) {
        Long userId = null;
        if (auth != null)
            userId = (long) auth.getName().hashCode(); // demo mapping

        return ResponseEntity.ok(service.forUser(userId));
    }
}
