package com.raju.portfolio.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.raju.portfolio.dto.auth.AdminProfileResponse;
import com.raju.portfolio.dto.auth.ChangePasswordRequest;
import com.raju.portfolio.entity.AdminUser;
import com.raju.portfolio.repository.AdminUserRepository;

@Service
public class AdminService {

    private final AdminUserRepository adminUserRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminService(
            AdminUserRepository adminUserRepository,
            PasswordEncoder passwordEncoder) {

        this.adminUserRepository = adminUserRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional(readOnly = true)
    public AdminProfileResponse getProfile(String username) {

        AdminUser adminUser =
                adminUserRepository.findByUsername(username)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Admin user not found"
                                ));

        return toResponse(adminUser);
    }

    @Transactional
    public void changePassword(
            String username,
            ChangePasswordRequest request) {

        AdminUser adminUser =
                adminUserRepository.findByUsername(username)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Admin user not found"
                                ));

        if (!passwordEncoder.matches(
                request.getCurrentPassword(),
                adminUser.getPassword())) {

            throw new IllegalArgumentException(
                    "Current password is incorrect"
            );
        }

        adminUser.setPassword(
                passwordEncoder.encode(
                        request.getNewPassword()
                )
        );

        adminUserRepository.save(adminUser);
    }

    @Transactional
    public void updateEnabled(
            Long id,
            boolean enabled) {

        AdminUser adminUser =
                adminUserRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Admin user not found"
                                ));

        adminUser.setEnabled(enabled);

        adminUserRepository.save(adminUser);
    }

    private AdminProfileResponse toResponse(
            AdminUser adminUser) {

        AdminProfileResponse response =
                new AdminProfileResponse();

        response.setId(adminUser.getId());
        response.setUsername(adminUser.getUsername());
        response.setEmail(adminUser.getEmail());
        response.setRole(
                adminUser.getRole()
        );
        response.setEnabled(
                adminUser.isEnabled()
        );

        return response;
    }
}