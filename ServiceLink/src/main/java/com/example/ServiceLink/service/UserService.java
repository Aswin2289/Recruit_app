package com.example.ServiceLink.service;

import com.example.ServiceLink.entity.User;
import com.example.ServiceLink.entity.dto.requestDTO.LoginRequestDTO;
import com.example.ServiceLink.entity.dto.requestDTO.UserRequestDTO;
import org.springframework.http.ResponseEntity;

public interface UserService {

    void addUser(UserRequestDTO userRequestDTO);
    ResponseEntity<Object> login(LoginRequestDTO loginRequestDTO);
    User getUserDetail(Integer id,byte status);
}
