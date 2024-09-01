package com.example.ServiceLink.entity.dto.requestDTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRequestDTO {

    @NotBlank(message = "USERNAME_REQUIRED")
    @Pattern(regexp = "^[a-zA-Z]+[a-zA-Z\\s]*$", message = "NAME_ALPHANUMERIC_ONLY")
    private String name;

    private String email;

    private String phoneNumber;

    @NotBlank(message = "PASSWORD_REQUIRED")
    @Size(min = 8,max = 16,message = "PASSWORD_LENGTH_REQUIRED")
    private String  password;

    private Integer role;
}
