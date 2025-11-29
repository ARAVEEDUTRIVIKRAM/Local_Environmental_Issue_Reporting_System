package com.environment.controller;

import com.environment.model.Issue;
import com.environment.model.User;
import com.environment.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService service;

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> listUsers() {
        return ResponseEntity.ok(service.listUsers());
    }

    @GetMapping("/issues")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Issue>> allIssues() {
        return ResponseEntity.ok(service.allIssues());
    }

    @PutMapping("/issues/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Issue> updateStatus(
            @PathVariable Long id,
            @RequestParam String status) {
        return ResponseEntity.ok(service.updateStatus(id, status));
    }
}
