package com.example.ServiceLink.controller;

import com.example.ServiceLink.entity.JobPost;
import com.example.ServiceLink.entity.dto.requestDTO.PostRequestDTO;
import com.example.ServiceLink.entity.dto.responseDTO.CompanyPostDetailResponseDTO;
import com.example.ServiceLink.entity.dto.responseDTO.CompanyPostResponseDTO;
import com.example.ServiceLink.entity.dto.responseDTO.PagedResponseDTO;
import com.example.ServiceLink.entity.dto.responseDTO.SuccessResponseDTO;
import com.example.ServiceLink.service.PostService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/post")
public class PostController {

    @Autowired
    private PostService postService;
    @Autowired
    private MessageSource messageSource;

    @PostMapping("/add")
    public ResponseEntity<Object> addPost(@Valid @RequestBody PostRequestDTO postRequestDTO) {
        postService.addPostService(postRequestDTO);
        return new ResponseEntity<>(
                new SuccessResponseDTO("201", "Job Post Successfully created"), HttpStatus.CREATED);
    }
    @GetMapping("/job/list")
    public ResponseEntity<PagedResponseDTO<JobPost>> getUsersWithFilters(
            @RequestParam(required = false) String searchKeyword,
            @RequestParam(required = false, defaultValue = "0,4") String status,
            @RequestParam(required = false, defaultValue = "createdDate") String sortBy,
            @RequestParam(required = false, defaultValue = "desc") String sortOrder,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        PagedResponseDTO<JobPost> response =
                postService.getAllJobPostWithFilter(
                        searchKeyword,
                        status,
                        sortBy,
                        sortOrder,
                        pageable);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/company/job/list")
    public ResponseEntity<PagedResponseDTO<CompanyPostResponseDTO>> getCompanyPosts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "title") String sortField,
            @RequestParam(defaultValue = "asc") String sortDirection,
            @RequestParam(required = false) String searchQuery) {

        System.out.println("Controller"+searchQuery);
        PagedResponseDTO<CompanyPostResponseDTO> posts = postService.getCompanyPostList(page, size, sortField, sortDirection, searchQuery);
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/company/job/{id}")
    public ResponseEntity<CompanyPostDetailResponseDTO> getCompanyPostById(@PathVariable Long id) {
        CompanyPostDetailResponseDTO post = postService.getCompanyPostById(id);
        return ResponseEntity.ok(post);
    }


    @PutMapping("/company/job/delete/{id}")
    public ResponseEntity<Object> deleteCompanyPost(@PathVariable Long id) {
        postService.deleteCompanyPostById(id);
        return new ResponseEntity<>(
                new SuccessResponseDTO("200", "Job Post Successfully deleted"), HttpStatus.OK);
    }
}
