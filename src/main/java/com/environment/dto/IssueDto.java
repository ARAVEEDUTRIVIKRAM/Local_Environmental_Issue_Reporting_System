package com.environment.dto;

import lombok.Data;

@Data
public class IssueDto {
    private String title;
    private String description;
    private String location;
    private String imagePath; // optional
}
