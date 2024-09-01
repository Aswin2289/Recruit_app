/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.ServiceLink.entity.dto.responseDTO;

import lombok.Data;

/**
 *
 * @author abdul.fahad
 */
@Data
public class SuccessResponseDTO {

    private String successCode;
    private String successMessage;

    public SuccessResponseDTO() {
    }

    public SuccessResponseDTO(String successCode, String successMessage) {
        this.successCode = successCode;
        this.successMessage = successMessage;
    }

    public String getSuccessCode() {
        return successCode;
    }

    public void setSuccessCode(String successCode) {
        this.successCode = successCode;
    }

    public String getSuccessMessage() {
        return successMessage;
    }

    public void setSuccessMessage(String successMessage) {
        this.successMessage = successMessage;
    }


}
