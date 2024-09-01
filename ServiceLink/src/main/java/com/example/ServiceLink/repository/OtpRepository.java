package com.example.ServiceLink.repository;

import com.example.ServiceLink.entity.Otp;
import com.example.ServiceLink.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OtpRepository extends JpaRepository<Otp,Integer> {

    Otp findByEmail(String email);
    Optional<User> findByEmailOrPhone(String email, String phone);
}
