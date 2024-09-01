package com.example.ServiceLink.entity.dto.requestDTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequestDTO {

    private String username;

    @NotBlank(message = "PASSWORD_REQUIRED")
    @Size(min = 8,max = 16,message = "PASSWORD_LENGTH_REQUIRED")
    private String  password;
}
