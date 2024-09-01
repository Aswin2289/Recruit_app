package com.example.ServiceLink.service.Impl;

import com.example.ServiceLink.entity.dto.requestDTO.OtpRequestDTO;
import com.example.ServiceLink.exceptionhandler.BadRequestException;
import com.example.ServiceLink.service.OtpService;
import com.example.ServiceLink.util.CommonUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;

import java.util.Locale;

@Service
@RequiredArgsConstructor
public class OtpServiceImpl implements OtpService {

    private final CommonUtil commonUtil;
    private final MessageSource messageSource;


    @Override
    public void verifyOtpService(OtpRequestDTO otpRequestDTO) {
        boolean isVerified = commonUtil.verifyOtp(otpRequestDTO.getEmail(), otpRequestDTO.getOtp());
        if (!isVerified) {
            throw new BadRequestException(messageSource.getMessage("",null, Locale.ENGLISH));
        }
    }
}
