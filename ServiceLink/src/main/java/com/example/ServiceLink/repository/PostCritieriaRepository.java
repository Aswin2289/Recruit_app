package com.example.ServiceLink.repository;

import com.example.ServiceLink.entity.JobPost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PostCritieriaRepository {

    Page<JobPost>getAllJobPostWithFilter(String searchKeyword, String jobType, String experience, String salaryRange, String status,String sortBy,String sortOrder, Pageable pageable);
}
