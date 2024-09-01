/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.ServiceLink.exceptionhandler;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;


public class BadRequestException extends ResponseStatusException{

    public BadRequestException() {
        super(HttpStatus.BAD_REQUEST);
    }

    public BadRequestException(String reason) {
        super(HttpStatus.BAD_REQUEST, reason);
    }


    public BadRequestException(String reason, Throwable cause) {
        super(HttpStatus.BAD_REQUEST, reason, cause);
    }

}
