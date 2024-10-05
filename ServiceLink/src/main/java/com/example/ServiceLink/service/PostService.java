package com.example.ServiceLink.service;

import com.example.ServiceLink.entity.JobPost;
import com.example.ServiceLink.entity.dto.requestDTO.PostRequestDTO;
import com.example.ServiceLink.entity.dto.responseDTO.CompanyPostDetailResponseDTO;
import com.example.ServiceLink.entity.dto.responseDTO.CompanyPostResponseDTO;
import com.example.ServiceLink.entity.dto.responseDTO.PagedResponseDTO;
import org.springframework.data.domain.Pageable;

import java.util.List;


public interface PostService {


    void addPostService(PostRequestDTO postRequestDTO);
    PagedResponseDTO<JobPost>getAllJobPostWithFilter(
            String searchKeyword,
            String status,
            String sortBy,
            String sortOrder,
            Pageable pageable);

    PagedResponseDTO<CompanyPostResponseDTO>getCompanyPostList(int page, int size, String sortField, String sortDirection,String searchQuery);
    CompanyPostDetailResponseDTO getCompanyPostById(Long id);

    void deleteCompanyPostById(Long id);
}
