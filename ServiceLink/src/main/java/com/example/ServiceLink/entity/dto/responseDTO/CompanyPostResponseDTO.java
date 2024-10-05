package com.example.ServiceLink.entity.dto.responseDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompanyPostResponseDTO {

    private Integer id;
    private String title;
    private String Location;
    private LocalDate applicationDeadline;
    private byte Status;
    private Integer totalApplication;
}
