package com.example.ServiceLink.entity.dto.requestDTO;


import lombok.Data;

@Data
public class EmployeeEditProfileDTO {

    private String name;
    private String title;
    private String profileSummary;
    private String education;
    private String location;
    private String website;
    private String address;
    private String experience;
}
