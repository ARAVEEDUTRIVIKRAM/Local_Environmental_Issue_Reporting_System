package com.environment.config;

import com.environment.model.Role;
import com.environment.model.User;
import com.environment.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataLoader {
    private final UserRepository userRepo;
    private final PasswordEncoder encoder;

    @PostConstruct
    public void load() {
        if (userRepo.findByUsername("admin").isEmpty()) {
            User admin = User.builder()
                    .username("admin")
                    .password(encoder.encode("admin123"))
                    .role(Role.ADMIN)
                    .fullName("System Admin")
                    .email("admin@example.com")
                    .build();
            userRepo.save(admin);
        }

        if (userRepo.findByUsername("user").isEmpty()) {
            User user = User.builder()
                    .username("user")
                    .password(encoder.encode("user123"))
                    .role(Role.USER)
                    .fullName("Demo User")
                    .email("user@example.com")
                    .build();
            userRepo.save(user);
        }
        if (userRepo.findByUsername("citizen").isEmpty()) {
            User citizen = User.builder()
                    .username("citizen")
                    .password(encoder.encode("citizen123"))
                    .role(Role.CITIZEN)
                    .fullName("Citizen User")
                    .email("citizen@example.com")
                    .build();
            userRepo.save(citizen);
        }

        if (userRepo.findByUsername("official").isEmpty()) {
            User official = User.builder()
                    .username("official")
                    .password(encoder.encode("official123"))
                    .role(Role.OFFICIAL)
                    .fullName("City Official")
                    .email("official@example.com")
                    .build();
            userRepo.save(official);
        }

    }
}

