package com.environment.repository;

import com.environment.model.Issue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IssueRepository extends JpaRepository<Issue, Long> {
    List<Issue> findTop100ByOrderByCreatedAtDesc();
}
