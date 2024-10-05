package com.example.ServiceLink.util;

import com.example.ServiceLink.entity.Role;
import com.example.ServiceLink.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Component
public class DataInitializer {

    @Autowired
    RoleRepository roleRepository;

    @Bean
    CommandLineRunner initRoles() {
        return args -> {
            addRoleIfNotExists(1, "super_admin");
            addRoleIfNotExists(2, "admin");
            addRoleIfNotExists(3, "user");
            addRoleIfNotExists(4, "company");
        };
    }

    @Transactional
    public void addRoleIfNotExists(Integer id, String roleName) {
        Optional<Role> role = roleRepository.findByName(roleName.toLowerCase());
        if (role.isEmpty()) {
            // Create new Role with specific ID and save it
            roleRepository.save(new Role(id, roleName.toLowerCase()));
        }
    }
}
