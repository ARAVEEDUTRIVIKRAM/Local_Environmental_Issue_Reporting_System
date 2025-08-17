package com.environment.controller; 

import com.environment.model.Issue;
import com.environment.service.IssueService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/issues")
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend React app to call this backend
public class IssueController {

    private final IssueService issueService;

    public IssueController(IssueService issueService) {
        this.issueService = issueService;
    }

    @PostMapping
    public Issue createIssue(@RequestBody Issue issue) {
        return issueService.createIssue(issue);
    }

    @GetMapping
    public List<Issue> getAllIssues() {
        return issueService.getAllIssues();
    }

    @PutMapping("/{id}/status")
    public Issue updateStatus(@PathVariable Long id, @RequestParam String status) {
        return issueService.updateStatus(id, status);
    }
}     


