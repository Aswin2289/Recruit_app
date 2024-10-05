package com.example.ServiceLink.entity.dto.responseDTO;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CompanyPostDetailResponseDTO {
    private Integer id;
    private String title;
    private String description;
    private String location;

    private String companyName;
    private String salaryRange;
    private byte jobType;
    private String experience;
    private LocalDate postDate;
    private byte status;
    private LocalDate applicationDeadline;
    private Integer userId;
    private String userName;
    private Integer totalApplication;

}
