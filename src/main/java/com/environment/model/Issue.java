package com.environment.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Table(name = "issues")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Issue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(columnDefinition = "text")
    private String description;

    private String imagePath;
    private String location;

    @Enumerated(EnumType.STRING)
    private IssueStatus status;   // ✅ ENUM SAFE

    private Instant createdAt;

    private Long createdByUserId;
}

