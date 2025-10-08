package com.environment.controller;

import com.environment.repository.IssueRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final IssueRepository issueRepository;

    public AdminController(IssueRepository issueRepository) {
        this.issueRepository = issueRepository;
    }

    @GetMapping("/stats")
    public Map<String, Object> stats() {
        long total = issueRepository.count();
        long reported = issueRepository.findByStatus("REPORTED").size();
        long inProgress = issueRepository.findByStatus("IN_PROGRESS").size();
        long resolved = issueRepository.findByStatus("RESOLVED").size();
        return Map.of("total", total, "reported", reported, "inProgress", inProgress, "resolved", resolved);
    }
}
