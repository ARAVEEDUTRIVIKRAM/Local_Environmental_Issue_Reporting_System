package com.environment.service;

import com.environment.model.Issue;
import com.environment.model.IssueStatus;
import com.environment.repository.IssueRepository;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.*;
import java.util.List;

@Service
public class IssueService {

    private final IssueRepository issueRepository;
    private final Path uploadDir = Paths.get("uploads"); // folder relative to project root

    public IssueService(IssueRepository issueRepository) {
        this.issueRepository = issueRepository;
        try {
            Files.createDirectories(uploadDir);
        } catch (IOException e) {
            throw new RuntimeException("Could not create upload folder", e);
        }
    }

    // create without file
    public Issue createIssue(Issue issue) {
        if (issue.getStatus() == null) {
            issue.setStatus(IssueStatus.REPORTED); // default for your enum
        }
        return issueRepository.save(issue);
    }

    // create with optional file
    public Issue createIssue(Issue issue, MultipartFile image) {
        if (image != null && !image.isEmpty()) {
            String original = StringUtils.cleanPath(image.getOriginalFilename());
            String filename = System.currentTimeMillis() + "_" + original;
            try (InputStream is = image.getInputStream()) {
                Files.copy(is, uploadDir.resolve(filename), StandardCopyOption.REPLACE_EXISTING);
                issue.setImageFilename(filename);
            } catch (IOException ex) {
                throw new RuntimeException("Failed to store file: " + ex.getMessage(), ex);
            }
        }
        if (issue.getStatus() == null) {
            issue.setStatus(IssueStatus.REPORTED);
        }
        return issueRepository.save(issue);
    }

    public List<Issue> getAllIssues() {
        return issueRepository.findAll();
    }

    /**
     * Update issue status. Accepts flexible strings:
     *  - "REPORTED", "reported"
     *  - "in_progress", "IN-PROGRESS", "in progress"
     *  - "resolved", etc.
     */
    public Issue updateStatus(Long id, String status) {
        Issue issue = issueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Issue not found with id: " + id));

        if (status == null || status.isBlank()) {
            throw new IllegalArgumentException("Status must be provided");
        }

        // normalize: trim, lowercase, replace spaces/hyphens with underscore, then uppercase
        String normalized = status.trim()
                .toUpperCase()
                .replace(' ', '_')
                .replace('-', '_');

        IssueStatus newStatus;
        try {
            newStatus = IssueStatus.valueOf(normalized);
        } catch (IllegalArgumentException ex) {
            throw new IllegalArgumentException("Invalid status: " + status + ". Allowed: "
                    + String.join(", ", enumNames()), ex);
        }

        issue.setStatus(newStatus);
        return issueRepository.save(issue);
    }

    // serve image
    public Resource loadFileAsResource(String filename) {
        try {
            Path file = uploadDir.resolve(filename).normalize();
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() && resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("File not found: " + filename);
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error reading file: " + filename, e);
        }
    }

    private String[] enumNames() {
        IssueStatus[] values = IssueStatus.values();
        String[] names = new String[values.length];
        for (int i = 0; i < values.length; i++) {
            names[i] = values[i].name();
        }
        return names;
    }
}

