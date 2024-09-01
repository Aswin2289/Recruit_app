package com.example.ServiceLink.service;

import com.example.ServiceLink.entity.dto.requestDTO.OtpRequestDTO;

public interface OtpService {

    void verifyOtpService(OtpRequestDTO otpRequestDTO);
}
