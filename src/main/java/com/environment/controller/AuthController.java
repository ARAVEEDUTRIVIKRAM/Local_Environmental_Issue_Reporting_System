package com.environment.controller;


import org.springframework.security.core.Authentication;

import com.environment.dto.AuthRequest;
import com.environment.dto.AuthResponse;
import com.environment.model.User;
import com.environment.repository.UserRepository;
import com.environment.security.JwtUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import com.environment.model.Role;


import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authManager;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepo;
    private final PasswordEncoder encoder;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody @Valid AuthRequest req) {

        Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        req.getUsername(), req.getPassword()
                )
        );

        User user = userRepo.findByUsername(req.getUsername())
                .orElseThrow();

        String token = jwtUtil.generateToken(user.getUsername());

        return ResponseEntity.ok(
                new AuthResponse(token, user.getRole().name(), user.getFullName())
        );
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid AuthRequest req) {

        if (userRepo.findByUsername(req.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists");
        }

        User u = User.builder()
                .username(req.getUsername())
                .password(encoder.encode(req.getPassword()))
                .role(Role.CITIZEN)
                .fullName(req.getUsername())
                .email("")
                .build();

        userRepo.save(u);

        return ResponseEntity.ok("User created");
    }
}
