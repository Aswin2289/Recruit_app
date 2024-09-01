package com.example.ServiceLink.util;

import com.example.ServiceLink.entity.Otp;
import com.example.ServiceLink.entity.User;
import com.example.ServiceLink.entity.dto.requestDTO.UserRequestDTO;
import com.example.ServiceLink.exceptionhandler.BadRequestException;
import com.example.ServiceLink.repository.OtpRepository;
import com.example.ServiceLink.repository.UserRepository;
import com.example.ServiceLink.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Locale;

@Component
@RequiredArgsConstructor
public class CommonUtil {

    private final MessageSource messageSource;
    private final UserRepository userRepository;
    private final byte[] userStatus={User.Status.ACTIVE.value};
    private final EmailService emailService;
    private final OtpRepository otpRepository;

    private final OTPUtil otpUtil;


    // Method to validate phone number
    public void validatePhoneNumber(UserRequestDTO userRequestDTO) {
        String phoneNumber = userRequestDTO.getPhoneNumber();

        if (phoneNumber != null && !phoneNumber.isEmpty()) {
            if (userRepository.existsByPhoneAndStatusIn(phoneNumber, userStatus)) {
                throw new BadRequestException(messageSource.getMessage("EMAIL_PHONE_ALREADY_EXISTS", null, Locale.ENGLISH));
            }
            if (phoneNumber.length() < 10 || phoneNumber.length() > 15) {
                throw new BadRequestException(messageSource.getMessage("PHONE_NUMBER_INVALID_LENGTH", null, Locale.ENGLISH));
            }
            if (!phoneNumber.matches("^[0-9]*$")) {
                throw new BadRequestException(messageSource.getMessage("PHONE_NUMBER_INVALID_FORMAT", null, Locale.ENGLISH));
            }
        } else {
            userRequestDTO.setPhoneNumber(null);
        }
    }

    // Method to validate email
    public void validateEmail(UserRequestDTO userRequestDTO) {
        String email = userRequestDTO.getEmail();

        if (email != null && !email.isEmpty()) {
            if (userRepository.existsByEmailAndStatusIn(email, userStatus)) {
                throw new BadRequestException(messageSource.getMessage("EMAIL_PHONE_ALREADY_EXISTS", null, Locale.ENGLISH));
            }
            if (!email.matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")) {
                throw new BadRequestException(messageSource.getMessage("EMAIL_INVALID_FORMAT", null, Locale.ENGLISH));
            }

            // Generating the OTP
            String otp = otpUtil.generateOTP();
            // Store OTP in the database
            Otp otp1=otpRepository.findByEmail(email);
            if (otp1 == null) {
                Otp otpEntity = new Otp();
                otpEntity.setEmail(email);
                otpEntity.setOtp(otp);
                otpEntity.setExpirationTime(LocalDateTime.now().plusMinutes(5)); // OTP valid for 5 minutes
                otpRepository.save(otpEntity);
            }
            else{
                otp1.setOtp(otp);
                otp1.setExpirationTime(LocalDateTime.now().plusMinutes(5)); // OTP valid for 5 minutes
                otpRepository.save(otp1);
            }
            String emailContent = "<div style=\"font-family: Arial, sans-serif; font-size: 14px; color: #333;\">" +
                    "<p>Hi " + userRequestDTO.getName() + ",</p>" +
                    "<p>Your OTP for verification is:</p>" +
                    "<div style=\"display: flex; justify-content: center;align-items: center;\">" +
                    "<div style=\"border: 1px solid #a5a5a8; padding: 10px; font-size: 24px; font-weight: bold; color: #4CAF50; text-align: center; width: 50px; height: 50px; margin: 0 5px;\">" +
                    otp.charAt(0) + "</div>" +
                    "<div style=\"border: 1px solid #a5a5a8; padding: 10px; font-size: 24px; font-weight: bold; color: #4CAF50; text-align: center; width: 50px; height: 50px; margin: 0 5px;\">" +
                    otp.charAt(1) + "</div>" +
                    "<div style=\"border: 1px solid #a5a5a8; padding: 10px; font-size: 24px; font-weight: bold; color: #4CAF50; text-align: center; width: 50px; height: 50px; margin: 0 5px;\">" +
                    otp.charAt(2) + "</div>" +
                    "<div style=\"border: 1px solid #a5a5a8; padding: 10px; font-size: 24px; font-weight: bold; color: #4CAF50; text-align: center; width: 50px; height: 50px; margin: 0 5px;\">" +
                    otp.charAt(3) + "</div>" +
                    "<div style=\"border: 1px solid #a5a5a8; padding: 10px; font-size: 24px; font-weight: bold; color: #4CAF50; text-align: center; width: 50px; height: 50px; margin: 0 5px;\">" +
                    otp.charAt(4) + "</div>" +
                    "<div style=\"border: 1px solid #a5a5a8; padding: 10px; font-size: 24px; font-weight: bold; color: #4CAF50; text-align: center; width: 50px; height: 50px; margin: 0 5px;\">" +
                    otp.charAt(5) + "</div>" +
                    "</div>" +
                    "<p>Please use this OTP to complete your verification process. The OTP is valid for 5 minutes.</p>" +
                    "<p>If you did not request this OTP, please ignore this email.</p>" +
                    "<hr>" +
                    "<p style=\"font-size: 12px; color: #777;\">" +
                    "<i>Disclaimer: The information contained in this email is confidential and intended only for the recipient. If you are not the intended recipient, you are advised that any use, dissemination, distribution, or reproduction of this email is prohibited. If you have received this email in error, please notify us immediately by return email and delete this email and any attachments from your system.</i>" +
                    "</p></div>";

            // Sending the email
            emailService.sendEmail(email, "OTP Verification", emailContent);
        } else {
            userRequestDTO.setEmail(null);
        }
    }
    // Method to verify OTP
    public boolean verifyOtp(String email, String otp) {
        Otp otpEntity = otpRepository.findByEmail(email);
        if (otpEntity != null && otpEntity.getOtp().equals(otp) && otpEntity.getExpirationTime().isAfter(LocalDateTime.now())) {
            // OTP is valid, update user status
            User user = userRepository.findByEmailAndStatus(email,User.Status.OTP_VERIFY.value).orElseThrow(()->
                    new BadRequestException(messageSource.getMessage("EMAIL_NOT_FOUND",null,Locale.ENGLISH)));
            if (user != null && user.getStatus() == User.Status.OTP_VERIFY.value) {
                user.setStatus(User.Status.ACTIVE.value); // Update status to ACTIVE
                userRepository.save(user);
                otpRepository.delete(otpEntity); // Remove OTP after successful verification
                return true;
            }
        }
        return false;
    }



}
