package com.environment.controller;

import com.environment.model.Issue;
import com.environment.service.OfficialService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/official")
@RequiredArgsConstructor
public class OfficialController {

    private final OfficialService service;

    @PutMapping("/issues/{id}/status")
    @PreAuthorize("hasRole('OFFICIAL')")
    public ResponseEntity<Issue> updateIssue(
            @PathVariable Long id,
            @RequestParam String status) {

        return ResponseEntity.ok(service.updateIssue(status, id));
    }
}

