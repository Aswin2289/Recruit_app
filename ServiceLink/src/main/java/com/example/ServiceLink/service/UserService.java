package com.example.ServiceLink.service;

import com.example.ServiceLink.entity.User;
import com.example.ServiceLink.entity.dto.requestDTO.*;
import org.springframework.http.ResponseEntity;

public interface UserService {

    void addUser(UserRequestDTO userRequestDTO);
    ResponseEntity<Object> login(LoginRequestDTO loginRequestDTO);
    User getUserDetail(Integer id,byte status);

    void changePassword(Integer id, ChangePasswordDTO changePasswordDTO);
    void editProfile(Integer id, CompanyEditProfileDTO companyEditProfileDTO);
    void deleteProfile(Integer id);
    void editEmployeeProfile(Integer id, EmployeeEditProfileDTO employeeEditProfileDTO);
}
