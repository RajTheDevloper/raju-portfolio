package com.raju.portfolio.security;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.raju.portfolio.entity.AdminUser;
import com.raju.portfolio.repository.AdminUserRepository;

@Service
public class CustomUserDetailsService
        implements UserDetailsService {

    private final AdminUserRepository adminUserRepository;

    public CustomUserDetailsService(
            AdminUserRepository adminUserRepository) {

        this.adminUserRepository = adminUserRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {

        AdminUser adminUser =
                adminUserRepository.findByUsername(username)
                        .orElseThrow(() ->
                                new UsernameNotFoundException(
                                        "Admin user not found"
                                )
                        );

        return User.builder()
                .username(adminUser.getUsername())
                .password(adminUser.getPassword())
                .roles(adminUser.getRole())
                .disabled(!adminUser.isEnabled())
                .build();
    }
}