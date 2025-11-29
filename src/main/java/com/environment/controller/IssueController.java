package com.environment.controller;

import com.environment.model.Issue;


import com.environment.service.IssueService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/issues")
@RequiredArgsConstructor
public class IssueController {
    private final IssueService service;

    @GetMapping
    public ResponseEntity<List<Issue>> all() {
        return ResponseEntity.ok(service.listRecent());
    }

    @PostMapping
    public ResponseEntity<Issue> create(@RequestBody @Valid Issue issue) {
        Issue saved = service.create(issue);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Issue> get(@PathVariable Long id) {
        Issue issue = service.get(id);
        if (issue == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(issue);
    }
}

