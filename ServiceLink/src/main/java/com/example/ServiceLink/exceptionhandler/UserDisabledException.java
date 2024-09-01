/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.ServiceLink.exceptionhandler;

import org.springframework.security.authentication.DisabledException;


public class UserDisabledException extends Exception {

    public UserDisabledException() {
    }

    public UserDisabledException(String message) {
        super(message);
    }

    public UserDisabledException(String message, DisabledException e) {
        super(message, e);
    }

}
