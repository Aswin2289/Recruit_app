package com.example.ServiceLink.service.Impl;


import com.example.ServiceLink.entity.JobPost;
import com.example.ServiceLink.entity.User;
import com.example.ServiceLink.entity.dto.requestDTO.PostRequestDTO;
import com.example.ServiceLink.entity.dto.responseDTO.CompanyPostDetailResponseDTO;
import com.example.ServiceLink.entity.dto.responseDTO.CompanyPostResponseDTO;
import com.example.ServiceLink.entity.dto.responseDTO.PagedResponseDTO;
import com.example.ServiceLink.exceptionhandler.BadRequestException;
import com.example.ServiceLink.repository.PostCritieriaRepository;
import com.example.ServiceLink.repository.PostRepository;
import com.example.ServiceLink.repository.UserRepository;
import com.example.ServiceLink.security.SecurityUtils;
import com.example.ServiceLink.service.PostService;
import com.example.ServiceLink.util.CommonUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final MessageSource messageSource;
    private final CommonUtil commonUtil;
    private final PostCritieriaRepository postCritieriaRepository;

    @Override
    public void addPostService(PostRequestDTO postRequestDTO) {
        commonUtil.validateCompany();
        LocalDate currentDate = LocalDate.now();
        if (postRequestDTO.getApplicationDeadline().isEqual(currentDate) || (postRequestDTO.getApplicationDeadline().isBefore(currentDate))) {
            throw new BadRequestException(messageSource.getMessage("APPLICATION_DEADLINE", null, Locale.ENGLISH));
        }
        byte[] statusUser = {User.Status.ACTIVE.value};
        User user = userRepository.findByIdAndStatusIn(postRequestDTO.getUserId(), statusUser).orElseThrow(
                () -> new BadRequestException(messageSource.getMessage("USER_NOT_FOUND", null, Locale.ENGLISH)));

        postRepository.save(new JobPost(postRequestDTO, user));
    }

    @Override
    public PagedResponseDTO<JobPost> getAllJobPostWithFilter(
            String searchKeyword,
            String status,
            String sortBy,
            String sortOrder,
            Pageable pageable){
        String jobType="0,1";
        String experience = null;  // Extract experience from input params
        String salaryRange = null;
        Page<JobPost> postPage= postCritieriaRepository.getAllJobPostWithFilter(searchKeyword,jobType,experience,salaryRange, status,sortBy,sortOrder,pageable);
        PagedResponseDTO<JobPost> responseDTO = new PagedResponseDTO<>(
                postPage.getContent(),
                postPage.getTotalPages(),
                postPage.getTotalElements(),
                postPage.getNumber()
        );

        return responseDTO;
    }
    @Override
    public PagedResponseDTO<CompanyPostResponseDTO> getCompanyPostList(
            int page, int size, String sortField, String sortDirection, String searchQuery) {
        System.out.println("Search"+searchQuery);
        commonUtil.validateCompany();
        UserDetails currentUser = SecurityUtils.getCurrentUserDetails();
        assert currentUser != null;

        User user = userRepository.findByEmailAndStatus(currentUser.getUsername(), User.Status.ACTIVE.value)
                .orElseThrow(() -> new BadRequestException(messageSource.getMessage("USER_NOT_FOUND", null, Locale.ENGLISH)));

        Sort.Direction direction = sortDirection.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
        Sort sort = Sort.by(direction, sortField);
        Pageable pageable = PageRequest.of(page, size, sort);

        // Fetch job posts with pagination, sorting, and search
        byte[] jobPostStatus = {JobPost.Status.ACTIVE.value, JobPost.Status.PENDING.value, JobPost.Status.BLOCKED.value};
        Page<JobPost> companyPostPage;

        if (searchQuery != null && !searchQuery.isEmpty()) {
            // Search by title or location
            companyPostPage = postRepository.findByUserIdAndStatusInAndTitleContainingIgnoreCase(
                    Math.toIntExact(user.getId()), jobPostStatus, searchQuery, pageable);
        } else {
            // Fetch all without filtering
            companyPostPage = postRepository.findByUserIdAndStatusIn(Math.toIntExact(user.getId()), jobPostStatus, pageable);
        }

        List<CompanyPostResponseDTO> responseDTO = new ArrayList<>();
        for (JobPost jobPost : companyPostPage) {
            CompanyPostResponseDTO companyPostResponseDTO = new CompanyPostResponseDTO();
            companyPostResponseDTO.setId(Math.toIntExact(jobPost.getId()));
            companyPostResponseDTO.setTitle(jobPost.getTitle());
            companyPostResponseDTO.setLocation(jobPost.getLocation());
            companyPostResponseDTO.setApplicationDeadline(jobPost.getApplicationDeadline());
            companyPostResponseDTO.setStatus(jobPost.getStatus());
            companyPostResponseDTO.setTotalApplication(10);  // Example data
            responseDTO.add(companyPostResponseDTO);
        }

        PagedResponseDTO<CompanyPostResponseDTO> pagedResponseDTO = new PagedResponseDTO<>();
        pagedResponseDTO.setItems(responseDTO);
        pagedResponseDTO.setTotalPages(companyPostPage.getTotalPages());
        pagedResponseDTO.setTotalItems(companyPostPage.getTotalElements());
        pagedResponseDTO.setCurrentPage(page);

        return pagedResponseDTO;
    }

    @Override
    public CompanyPostDetailResponseDTO getCompanyPostById(Long id) {

        commonUtil.validateCompany();
        UserDetails currentUser = SecurityUtils.getCurrentUserDetails();
        assert currentUser != null;

        User user = userRepository.findByEmailAndStatus(currentUser.getUsername(), User.Status.ACTIVE.value)
                .orElseThrow(() -> new BadRequestException(messageSource.getMessage("USER_NOT_FOUND", null, Locale.ENGLISH)));
        byte[] postStatus = {JobPost.Status.ACTIVE.value,JobPost.Status.PENDING.value,JobPost.Status.INACTIVE.value,JobPost.Status.BLOCKED.value};
        JobPost jobPost=postRepository.findByIdAndStatusInAndUserId(id,postStatus, user.getId())
                .orElseThrow(() -> new BadRequestException(messageSource.getMessage("POST_NOT_FOUND", null, Locale.ENGLISH)));

        CompanyPostDetailResponseDTO responseDTO=new CompanyPostDetailResponseDTO();
        responseDTO.setId(Math.toIntExact(jobPost.getId()));
        responseDTO.setTitle(jobPost.getTitle());
        responseDTO.setDescription(jobPost.getDescription());
        responseDTO.setLocation(jobPost.getLocation());
        responseDTO.setCompanyName(jobPost.getCompanyName());
        responseDTO.setSalaryRange(jobPost.getSalaryRange());
        responseDTO.setJobType(jobPost.getJobType());
        responseDTO.setExperience(jobPost.getExperience());
        responseDTO.setPostDate(jobPost.getPostDate());
        responseDTO.setStatus(jobPost.getStatus());
        responseDTO.setApplicationDeadline(jobPost.getApplicationDeadline());
        responseDTO.setUserId(Math.toIntExact(user.getId()));
        responseDTO.setUserName(user.getName());
        responseDTO.setTotalApplication(10);  // Example data
        return responseDTO;
    }

    @Override
    public void deleteCompanyPostById(Long id) {
        commonUtil.validateCompany();
        UserDetails currentUser = SecurityUtils.getCurrentUserDetails();
        assert currentUser != null;

        User user = userRepository.findByEmailAndStatus(currentUser.getUsername(), User.Status.ACTIVE.value)
                .orElseThrow(() -> new BadRequestException(messageSource.getMessage("USER_NOT_FOUND", null, Locale.ENGLISH)));

        byte[] postStatus = {JobPost.Status.ACTIVE.value,JobPost.Status.PENDING.value,JobPost.Status.INACTIVE.value,JobPost.Status.BLOCKED.value};
        JobPost jobPost=postRepository.findByIdAndStatusInAndUserId(id,postStatus, user.getId())
                .orElseThrow(() -> new BadRequestException(messageSource.getMessage("POST_NOT_FOUND", null, Locale.ENGLISH)));

        jobPost.setStatus(JobPost.Status.DELETED.value);
        postRepository.save(jobPost);
    }


}
