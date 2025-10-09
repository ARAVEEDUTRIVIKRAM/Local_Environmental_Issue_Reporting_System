package com.environment.config;

import com.environment.model.Role;
import com.environment.model.User;
import com.environment.repository.UserRepository;
import org.springframework.stereotype.Component;
import jakarta.annotation.PostConstruct;
import java.util.Set;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Creates initial users (admin, sample official/citizen) if they don't exist.
 * Uses PasswordEncoder bean to encode passwords.
 */
@Component
public class DataLoader {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataLoader(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostConstruct
    public void init() {
        createAdminIfMissing();
        createSampleOfficial();
        createSampleCitizen();
    }

    private void createAdminIfMissing() {
        String adminUsername = "admin";
        userRepository.findByUsername(adminUsername).ifPresentOrElse(
            u -> System.out.println("Admin already exists. Skipping creation."),
            () -> {
                User admin = User.builder()
                        .username(adminUsername)
                        .password(passwordEncoder.encode("ChangeMeAdmin123!")) // change to secure password
                        .name("Administrator")
                        .email("admin@example.com")
                        .roles(Set.of(Role.ROLE_ADMIN))
                        .build();
                userRepository.save(admin);
                System.out.println("Admin user created.");
            }
        );
    }

    private void createSampleOfficial() {
        String username = "official";
        if (userRepository.findByUsername(username).isEmpty()) {
            User official = User.builder()
                    .username(username)
                    .password(passwordEncoder.encode("officialpass"))
                    .name("City Official")
                    .email("official@example.com")
                    .roles(Set.of(Role.ROLE_OFFICIAL))
                    .build();
            userRepository.save(official);
            System.out.println("Official user created.");
        }
    }

    private void createSampleCitizen() {
        String username = "citizen";
        if (userRepository.findByUsername(username).isEmpty()) {
            User citizen = User.builder()
                    .username(username)
                    .password(passwordEncoder.encode("citizenpass"))
                    .name("Sample Citizen")
                    .email("citizen@example.com")
                    .roles(Set.of(Role.ROLE_CITIZEN))
                    .build();
            userRepository.save(citizen);
            System.out.println("Citizen user created.");
        }
    }
}

