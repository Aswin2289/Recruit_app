package com.example.ServiceLink.controller;

import com.example.ServiceLink.entity.User;
import com.example.ServiceLink.entity.dto.requestDTO.*;
import com.example.ServiceLink.entity.dto.responseDTO.SuccessResponseDTO;
import com.example.ServiceLink.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/userDetail/{id}")
    public ResponseEntity<Object> getUserDetail(@PathVariable Integer id) {
        byte status=1;
        User user=  userService.getUserDetail(id, status);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/changePassword/{id}")
    public ResponseEntity<Object> changePassword(@PathVariable Integer id, @Valid @RequestBody ChangePasswordDTO changePasswordDTO) {
        userService.changePassword(id, changePasswordDTO);
        return new ResponseEntity<>(
                new SuccessResponseDTO("200", "Password successfully changed"), HttpStatus.OK);
    }
    @GetMapping("/profile/{id}")
    public ResponseEntity<Object> getUserDetail1(@PathVariable Integer id) {
        byte status=0;
        User user=  userService.getUserDetail(id, status);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/editProfile/{id}")
    public ResponseEntity<Object> editProfile(@PathVariable Integer id, @Valid @RequestBody CompanyEditProfileDTO companyEditProfileDTO) {
        userService.editProfile(id, companyEditProfileDTO);
        return new ResponseEntity<>(
                new SuccessResponseDTO("200", "Profile successfully edited"), HttpStatus.OK);
    }

    @PutMapping("/deleteProfile/{id}")
    public ResponseEntity<Object> deleteProfile(@PathVariable Integer id) {
        userService.deleteProfile(id);
        return new ResponseEntity<>(
                new SuccessResponseDTO("200", "Profile successfully deleted"), HttpStatus.OK);
    }
    @PutMapping("/editEmployeeProfile/{id}")
    public ResponseEntity<Object> editEmployeeProfile(@PathVariable Integer id, @Valid @RequestBody EmployeeEditProfileDTO employeeEditProfileDTO) {
        userService.editEmployeeProfile(id, employeeEditProfileDTO);
        return new ResponseEntity<>(
                new SuccessResponseDTO("200", "Profile successfully edited"), HttpStatus.OK);
    }



}
