package com.environment.service;

import com.environment.model.Issue;
import com.environment.model.User;
import com.environment.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepo;
    private final IssueService issueService;

    public List<User> listUsers() {
        return userRepo.findAll();
    }

    public List<Issue> allIssues() {
        return issueService.findAll();
    }

    public Issue updateStatus(Long id, String status) {
        return issueService.updateStatus(id, status);
    }
}
