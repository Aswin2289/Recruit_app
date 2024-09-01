package com.example.ServiceLink.repository;

import com.example.ServiceLink.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByName(String role);

    List<Role> findAllByIdNotOrderById(Integer id);

    Optional<Role> findById(Integer id);
}
