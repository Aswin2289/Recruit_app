package com.example.ServiceLink.controller;

import com.example.ServiceLink.entity.dto.requestDTO.LoginRequestDTO;
import com.example.ServiceLink.entity.dto.requestDTO.UserRequestDTO;
import com.example.ServiceLink.entity.dto.responseDTO.SuccessResponseDTO;
import com.example.ServiceLink.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private MessageSource messageSource;


    @PostMapping("/add")
    public ResponseEntity<Object> addUser(@Valid @RequestBody UserRequestDTO userRequestDTO) {
        userService.addUser(userRequestDTO);
        return new ResponseEntity<>(
                new SuccessResponseDTO("201", "User Successfully created"), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<Object> loginUser(@Valid @RequestBody LoginRequestDTO loginRequestDTO) {
        return userService.login(loginRequestDTO);
    }
}
