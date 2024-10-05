package com.example.ServiceLink.entity.dto.requestDTO;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApplicantRequestDTO {

    @NotNull(message = "APPLICANT_ID_REQUIRED")
    private Integer userId;
    @NotNull(message = "APPLICATION_ID_REQUIRED")
    private Integer jobPostId;
}
