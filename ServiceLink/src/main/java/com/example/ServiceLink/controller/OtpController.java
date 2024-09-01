package com.example.ServiceLink.controller;

import com.example.ServiceLink.entity.dto.requestDTO.OtpRequestDTO;
import com.example.ServiceLink.entity.dto.responseDTO.SuccessResponseDTO;
import com.example.ServiceLink.service.OtpService;
import com.example.ServiceLink.util.CommonUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/otp")
public class OtpController {


    @Autowired
    private CommonUtil commonUtil;

    @Autowired
    private OtpService otpService;

    @PostMapping("/verify")
    public ResponseEntity<Object>verifyOtp(@Valid @RequestBody OtpRequestDTO otpRequestDTO){
        otpService.verifyOtpService(otpRequestDTO);
        return new ResponseEntity<>(
                new SuccessResponseDTO("200", "OTP VERIFIED SUCCESSFULLY"), HttpStatus.OK);
    }
}
