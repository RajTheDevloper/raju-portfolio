package com.raju.portfolio.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.raju.portfolio.entity.AdminUser;
import com.raju.portfolio.repository.AdminUserRepository;

@Component
public class AdminUserInitializer implements CommandLineRunner {

    private final AdminUserRepository adminUserRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.admin.username}")
    private String adminUsername;

    @Value("${app.admin.email}")
    private String adminEmail;

    @Value("${app.admin.password}")
    private String adminPassword;

    public AdminUserInitializer(
            AdminUserRepository adminUserRepository,
            PasswordEncoder passwordEncoder) {

        this.adminUserRepository = adminUserRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {

        if (adminUserRepository.existsByUsername(adminUsername)) {
            return;
        }

        AdminUser adminUser = new AdminUser();

        adminUser.setUsername(adminUsername);
        adminUser.setEmail(adminEmail);
        adminUser.setPassword(
                passwordEncoder.encode(adminPassword)
        );
        adminUser.setRole("ADMIN");
        adminUser.setEnabled(true);

        adminUserRepository.save(adminUser);

        System.out.println(
                "Default admin user created: " + adminUsername
        );
    }
}