package com.example.ServiceLink.entity.dto.requestDTO;


import lombok.Data;

@Data
public class CompanyEditProfileDTO {

    private String companyName;
    private String profileSummary;
    private String website;
    private String location;
    private String email;
    private String phone;
    private String address;
}
