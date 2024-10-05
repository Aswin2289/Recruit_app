package com.example.ServiceLink.entity.dto.responseDTO;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ApplicantListResponseDTO {

    private Integer id;
    private String applicantName;
    private String email;
    private String experience;
    private LocalDate createDate;


}
