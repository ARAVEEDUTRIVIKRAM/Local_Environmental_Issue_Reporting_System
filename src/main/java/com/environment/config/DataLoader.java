package com.environment.config;

import com.environment.model.Role;
import com.environment.model.User;
import com.environment.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class DataLoader implements ApplicationRunner {

    private static final Logger log =
            LoggerFactory.getLogger(DataLoader.class);

    private final UserRepository userRepo;
    private final PasswordEncoder encoder;

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        log.info("Starting demo-user initialization");

        createUserIfMissing(
                "admin", "admin123", Role.ADMIN,
                "System Admin", "admin@example.com"
        );

        createUserIfMissing(
                "user", "user123", Role.USER,
                "Demo User", "user@example.com"
        );

        createUserIfMissing(
                "citizen", "citizen123", Role.CITIZEN,
                "Citizen User", "citizen@example.com"
        );

        createUserIfMissing(
                "official", "official123", Role.OFFICIAL,
                "City Official", "official@example.com"
        );

        log.info("Demo-user initialization completed");
    }

    private void createUserIfMissing(
            String username,
            String password,
            Role role,
            String fullName,
            String email
    ) {
        log.info("Checking demo account: {}", username);

        if (userRepo.findByUsername(username).isEmpty()) {
            User user = User.builder()
                    .username(username)
                    .password(encoder.encode(password))
                    .role(role)
                    .fullName(fullName)
                    .email(email)
                    .build();

            userRepo.save(user);

            log.info("Created demo account: {}", username);
        } else {
            log.info("Demo account already exists: {}", username);
        }
    }
}
