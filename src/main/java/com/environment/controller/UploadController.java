package com.environment.controller;

import com.environment.service.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@RestController
@RequestMapping("/api/upload")
@RequiredArgsConstructor
public class UploadController {

    private final FileStorageService fileService;

    @PostMapping
    public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file) throws IOException {

        if (file.getSize() > 5_000_000) {
            return ResponseEntity.badRequest().body("File too large (max 5MB)");
        }

        String type = file.getContentType();
        if (type == null || !(type.startsWith("image/"))) {
            return ResponseEntity.badRequest().body("Only images allowed");
        }

        String url = fileService.saveFile(file);
        return ResponseEntity.ok(url);
    }
}
