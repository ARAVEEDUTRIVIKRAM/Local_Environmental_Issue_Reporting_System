package com.environment.service;

import com.environment.model.Issue;
import com.environment.model.IssueStatus;
import com.environment.repository.IssueRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class IssueService {

    private final IssueRepository repo;

    public List<Issue> listRecent() {
        return repo.findTop100ByOrderByCreatedAtDesc();
    }

    public Issue create(Issue issue) {
        issue.setCreatedAt(Instant.now());

        if (issue.getStatus() == null) {
            issue.setStatus(IssueStatus.OPEN);
        }

        return repo.save(issue);
    }

    public Issue get(Long id) {
        return repo.findById(id).orElse(null);
    }

    public Issue update(Issue issue) {
        return repo.save(issue);
    }

    public List<Issue> findAll() {
        return repo.findAll();
    }

    public Issue updateStatus(Long id, String status) {
        Issue i = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Issue not found"));

        IssueStatus newStatus = IssueStatus.valueOf(status.toUpperCase());
        i.setStatus(newStatus);

        return repo.save(i);
    }
}


