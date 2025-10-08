package com.environment.repository;

import com.environment.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // Spring Data JPA will generate the query automatically
    Optional<User> findByUsername(String username);

    boolean existsByUsername(String username);
}
