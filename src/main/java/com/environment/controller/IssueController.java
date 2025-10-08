package com.environment.controller;

import com.environment.model.Issue;
import com.environment.model.IssueStatus;
import com.environment.model.User;
import com.environment.repository.IssueRepository;
import com.environment.repository.UserRepository;
import com.environment.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.*;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/issues")
public class IssueController {

    private final IssueRepository issueRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;
    private final Path uploadDir = Paths.get("uploads");

    public IssueController(IssueRepository issueRepo, UserRepository userRepo, NotificationService notificationService) {
        this.issueRepository = issueRepo;
        this.userRepository = userRepo;
        this.notificationService = notificationService;
        try { Files.createDirectories(uploadDir); } catch (IOException ignored) {}
    }

    @GetMapping
    public List<Issue> getAllIssues() {
        return issueRepository.findAll();
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<?> createIssue(@RequestParam String title,
                                         @RequestParam String description,
                                         @RequestParam String category,
                                         @RequestParam String location,
                                         @RequestParam(required = false) MultipartFile image,
                                         Authentication auth) throws IOException {
        String username = auth.getName();
        User user = userRepository.findByUsername(username).orElseThrow();
        Issue issue = new Issue();
        issue.setTitle(title);
        issue.setDescription(description);
        issue.setCategory(category);
        issue.setLocation(location);
        issue.setStatus(IssueStatus.REPORTED);
        issue.setTimestamp(Instant.now());
        issue.setCreatedBy(user);

        if (image != null && !image.isEmpty()) {
            String fname = System.currentTimeMillis() + "_" + image.getOriginalFilename();
            Path target = uploadDir.resolve(fname);
            try (InputStream in = image.getInputStream()) {
                Files.copy(in, target, StandardCopyOption.REPLACE_EXISTING);
            }
            issue.setImageFilename(fname);
        }
        issueRepository.save(issue);

        // notify admin/officials (example)
        notificationService.createNotificationForAdmins("New issue reported: " + issue.getTitle());

        return ResponseEntity.ok(issue);
    }

    @PostMapping("/{id}/assign")
    public ResponseEntity<?> assignIssue(@PathVariable Long id, @RequestParam Long officialId) {
        Optional<Issue> oi = issueRepository.findById(id);
        if (oi.isEmpty()) return ResponseEntity.notFound().build();
        Issue issue = oi.get();
        User official = userRepository.findById(officialId).orElseThrow();
        issue.setAssignedTo(official);
        issue.setStatus(IssueStatus.IN_PROGRESS);
        issueRepository.save(issue);

        notificationService.notifyUser(issue.getCreatedBy().getId(), "Your issue has been assigned to " + official.getName());
        return ResponseEntity.ok(issue);
    }

    @PostMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestParam IssueStatus status) {
        Issue issue = issueRepository.findById(id).orElseThrow();
        issue.setStatus(status);
        issueRepository.save(issue);

        notificationService.notifyUser(issue.getCreatedBy().getId(), "Status changed to " + status);
        return ResponseEntity.ok(issue);
    }

    // Serve uploaded file URLs (static mapping also done in application.properties)
    @GetMapping("/{id}")
    public ResponseEntity<Issue> getIssue(@PathVariable Long id) {
        Issue issue = issueRepository.findById(id).orElseThrow();
        return ResponseEntity.ok(issue);
    }
}




