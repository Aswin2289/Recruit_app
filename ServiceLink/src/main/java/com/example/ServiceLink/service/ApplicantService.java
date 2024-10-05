package com.example.ServiceLink.service;

import com.example.ServiceLink.entity.JobPost;
import com.example.ServiceLink.entity.dto.requestDTO.ApplicantRequestDTO;
import com.example.ServiceLink.entity.dto.responseDTO.ApplicantListResponseDTO;
import com.example.ServiceLink.entity.dto.responseDTO.PagedResponseDTO;
import org.springframework.data.domain.Pageable;

public interface ApplicantService {

    void applyForJobPost(ApplicantRequestDTO applicantRequestDTO);

    PagedResponseDTO<ApplicantListResponseDTO> getAllApplicantWithFilter(
            String jobPostId,
            String searchKeyword,
            String status,
            String sortBy,
            String sortOrder,
            Pageable pageable);

    boolean hasUserAppliedForJob(ApplicantRequestDTO applicantRequestDTO);
    void deleteApplicantById(Long id);
}
