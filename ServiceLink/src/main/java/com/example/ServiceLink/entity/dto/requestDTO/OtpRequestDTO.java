package com.example.ServiceLink.entity.dto.requestDTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OtpRequestDTO {

    @NotBlank(message = "EMAIL_REQUIRED")
    @Email(message = "EMAIL_INVALID_FORMAT")
    private String email;

    @NotBlank(message = "OTP_REQUIRED")
    @Size(min = 6, max = 6, message = "OTP_MUST_BE_SIX_DIGITS")
    @Pattern(regexp = "^[0-9]{6}$", message = "OTP_NOT_VALID")
    private String otp;
}
