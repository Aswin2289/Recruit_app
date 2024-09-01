package com.example.ServiceLink.service.Impl;

import com.example.ServiceLink.entity.Role;
import com.example.ServiceLink.entity.dto.requestDTO.RoleRequestDTO;
import com.example.ServiceLink.exceptionhandler.BadRequestException;
import com.example.ServiceLink.repository.RoleRepository;
import com.example.ServiceLink.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Locale;
import java.util.Optional;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    MessageSource messageSource;



    @Override
    @Transactional
    public void addRole(RoleRequestDTO roleRequestDTO) {
        Optional<Role> role = roleRepository.findByName(roleRequestDTO.getRole().toUpperCase());
        role.ifPresent(value -> {
            throw new BadRequestException(messageSource.getMessage("ROLE_ALREADY_EXISTS", null, Locale.ENGLISH));
        });
        roleRepository.save(new Role(roleRequestDTO.getRole().toUpperCase()));
    }

}
