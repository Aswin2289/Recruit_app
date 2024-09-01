/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.ServiceLink.exceptionhandler;

import org.springframework.security.authentication.BadCredentialsException;


public class InvalidUserException extends Exception {

    public InvalidUserException() {
    }

    public InvalidUserException(String message) {
        super(message);
    }

    public InvalidUserException(String message, BadCredentialsException e) {
        super(message, e);
    }

}
