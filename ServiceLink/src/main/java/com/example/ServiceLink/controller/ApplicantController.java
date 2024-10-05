package com.example.ServiceLink.controller;


import com.example.ServiceLink.entity.dto.requestDTO.ApplicantRequestDTO;
import com.example.ServiceLink.entity.dto.responseDTO.ApplicantListResponseDTO;
import com.example.ServiceLink.entity.dto.responseDTO.PagedResponseDTO;
import com.example.ServiceLink.entity.dto.responseDTO.SuccessResponseDTO;
import com.example.ServiceLink.service.ApplicantService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/applicant")
public class ApplicantController {

    @Autowired
    private ApplicantService applicantService;

    @PostMapping("/apply")
    public ResponseEntity<Object> applyForApplication(@Valid @RequestBody ApplicantRequestDTO applicantRequestDTO) {

        applicantService.applyForJobPost(applicantRequestDTO);
        return new ResponseEntity<>(new SuccessResponseDTO("201", "User Successfully created"), HttpStatus.CREATED);
    }

    @GetMapping("/list/{id}")
    public ResponseEntity<PagedResponseDTO<ApplicantListResponseDTO>> getUsersWithFilters(@PathVariable String id, @RequestParam(required = false) String searchKeyword, @RequestParam(required = false, defaultValue = "1") String status, @RequestParam(required = false, defaultValue = "createdDate") String sortBy, @RequestParam(required = false, defaultValue = "desc") String sortOrder, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);

        PagedResponseDTO<ApplicantListResponseDTO> response = applicantService.getAllApplicantWithFilter(id, searchKeyword, status, sortBy, sortOrder, pageable);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/applied")
    public ResponseEntity<Boolean>hasApplied(@RequestParam Integer userId, @RequestParam Integer jobPostId){
        ApplicantRequestDTO applicantRequestDTO = new ApplicantRequestDTO(userId, jobPostId);
        return new ResponseEntity<>(applicantService.hasUserAppliedForJob(applicantRequestDTO), HttpStatus.OK);
    }

    @PutMapping("/delete/{id}")
    public ResponseEntity<Object> deleteApplicant(@PathVariable Long id) {
        applicantService.deleteApplicantById(id);
        return new ResponseEntity<>(new SuccessResponseDTO("200", "Applicant Successfully Rejected"), HttpStatus.OK);
    }


}
