package com.environment.service;

import com.environment.model.Issue;
import com.environment.repository.IssueRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IssueService {

    private final IssueRepository issueRepository;

    public IssueService(IssueRepository issueRepository) {
        this.issueRepository = issueRepository;
    }

    public Issue createIssue(Issue issue) {
        return issueRepository.save(issue);
    }

    public List<Issue> getAllIssues() {
        return issueRepository.findAll();
    }

    public Issue updateStatus(Long id, String status) {
        Issue issue = issueRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("Issue not found"));
        issue.setStatus(status);
        return issueRepository.save(issue);
    }
}
