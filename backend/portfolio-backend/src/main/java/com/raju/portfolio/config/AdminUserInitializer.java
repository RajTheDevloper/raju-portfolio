package com.raju.portfolio.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.raju.portfolio.entity.AdminUser;
import com.raju.portfolio.repository.AdminUserRepository;

@Component
public class AdminUserInitializer implements CommandLineRunner {

    private final AdminUserRepository adminUserRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminUserInitializer(
            AdminUserRepository adminUserRepository,
            PasswordEncoder passwordEncoder) {

        this.adminUserRepository = adminUserRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {

        if (adminUserRepository.count() == 0) {

            AdminUser adminUser = new AdminUser();

            adminUser.setUsername("raju");
            adminUser.setEmail("admin@example.com");

            adminUser.setPassword(
                    passwordEncoder.encode("ChangeMe123!")
            );

            adminUser.setRole("ADMIN");
            adminUser.setEnabled(true);

            adminUserRepository.save(adminUser);
        }
    }
}