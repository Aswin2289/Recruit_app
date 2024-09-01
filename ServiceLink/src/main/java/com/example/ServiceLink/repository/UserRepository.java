package com.example.ServiceLink.repository;

import com.example.ServiceLink.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmailAndStatus(String email, byte status);
    Optional<User> findByPhoneAndStatus(String phone, byte status);
    Optional<User> findByEmailAndStatusIn(String email, byte[] status);
    Optional<User> findByPhoneAndStatusIn(String phone, byte[] status);
    boolean existsByPhoneAndStatusIn(String phoneNumber, byte[] status);
    boolean existsByEmailAndStatusIn(String phoneNumber, byte[] status);

//    Optional<User>findByEmailOrPhoneAndStatus(String email, String phone,byte status);
}
