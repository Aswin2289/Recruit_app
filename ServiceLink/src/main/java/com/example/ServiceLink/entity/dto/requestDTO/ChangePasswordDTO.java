package com.example.ServiceLink.entity.dto.requestDTO;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ChangePasswordDTO {

    @NotNull(message = "CURRENT_PASSWORD_REQUIRED")
    private String oldPassword;

    @NotNull(message = "NEW_PASSWORD_REQUIRED")
    @Size(min = 8,max = 16,message = "PASSWORD_LENGTH_REQUIRED")
    private String newPassword;


    private String confirmPassword;
}
