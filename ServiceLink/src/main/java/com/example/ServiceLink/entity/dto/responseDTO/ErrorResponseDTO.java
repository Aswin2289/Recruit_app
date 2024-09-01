package com.example.ServiceLink.entity.dto.responseDTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ErrorResponseDTO {

    private String errorCode;
    private String errorMessage;


    public ErrorResponseDTO() {

        this.errorCode = "0";
        this.errorMessage = "";
    }
}
