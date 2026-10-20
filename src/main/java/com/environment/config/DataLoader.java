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

        var existingUser = userRepo.findByUsername(username);

        if (existingUser.isEmpty()) {
            User user = User.builder()
                    .username(username)
                    .password(encoder.encode(password))
                    .role(role)
                    .fullName(fullName)
                    .email(email)
                    .build();

            userRepo.save(user);
            log.info("Created demo account: {}", username);
            return;
        }

        // Demo credentials are documented in the public login page. Existing rows
        // may have an older or mismatched password hash, so verify and repair only
        // the demo account password instead of assuming that row existence is enough.
        User user = existingUser.get();
        if (!encoder.matches(password, user.getPassword())) {
            user.setPassword(encoder.encode(password));
            userRepo.save(user);
            log.warn("Reset password hash for demo account: {}", username);
        } else {
            log.info("Demo account already exists with the expected password: {}", username);
        }
    }
}
