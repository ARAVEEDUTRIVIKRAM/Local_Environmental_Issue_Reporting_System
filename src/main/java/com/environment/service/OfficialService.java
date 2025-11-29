package com.environment.service;

import com.environment.model.Issue;
import com.environment.model.IssueStatus;
import com.environment.repository.IssueRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OfficialService {

    private final IssueRepository repo;

    public Issue updateIssue(String status, Long id) {
        Issue issue = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Issue not found"));

        // Convert incoming status string → enum safely
        IssueStatus newStatus = IssueStatus.valueOf(status.toUpperCase());

        issue.setStatus(newStatus);
        return repo.save(issue);
    }
}
