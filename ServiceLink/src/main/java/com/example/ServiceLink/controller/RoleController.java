package com.example.ServiceLink.controller;

import com.example.ServiceLink.entity.dto.requestDTO.RoleRequestDTO;
import com.example.ServiceLink.entity.dto.responseDTO.SuccessResponseDTO;
import com.example.ServiceLink.service.RoleService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Locale;

@RestController
@RequestMapping("/api/v1/role")
public class RoleController {

    @Autowired
    private RoleService roleService;
    @Autowired
    MessageSource messageSource;

    public RoleController(RoleService roleService, MessageSource messageSource) {
        this.roleService = roleService;
        this.messageSource = messageSource;
    }
    @PostMapping
    public ResponseEntity<Object> addRole(@Valid @RequestBody RoleRequestDTO roleRequestDTO) {

        roleService.addRole(roleRequestDTO);
        String[] list = messageSource.getMessage("ROLE_ADDED", null, Locale.ENGLISH).split("-");
        return new ResponseEntity<>(new SuccessResponseDTO(list[0], list[1]), HttpStatus.CREATED);
    }
}
