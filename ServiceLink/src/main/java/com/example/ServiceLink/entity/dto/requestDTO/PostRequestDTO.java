package com.example.ServiceLink.entity.dto.requestDTO;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostRequestDTO {

    @NotNull(message ="JOB_TITLE_REQUIRED" )
    private String title;
    @NotNull(message = "JOB_DESCRIPTION_REQUIRED")
    private String description;
    @NotNull(message = "LOCATION_REQUIRED")
    private String location;

    private String salaryRange;
    @NotNull(message = "COMPANY_NAME_REQUIRED")
    private String companyName;
    @NotNull(message = "JOB_TYPE_REQUIRED")
    private byte jobType;
    @NotNull(message = "EXPERIENCE_REQUIRED")
    private String experience;
    @NotNull(message = "USER_ID_REQUIRED")
    private Integer userId;
    private LocalDate applicationDeadline;
}
