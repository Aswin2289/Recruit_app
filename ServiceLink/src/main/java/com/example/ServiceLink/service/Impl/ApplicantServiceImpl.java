package com.example.ServiceLink.service.Impl;

import com.example.ServiceLink.entity.Applicant;
import com.example.ServiceLink.entity.JobPost;
import com.example.ServiceLink.entity.User;
import com.example.ServiceLink.entity.dto.requestDTO.ApplicantRequestDTO;
import com.example.ServiceLink.entity.dto.responseDTO.ApplicantListResponseDTO;
import com.example.ServiceLink.entity.dto.responseDTO.PagedResponseDTO;
import com.example.ServiceLink.exceptionhandler.BadRequestException;
import com.example.ServiceLink.repository.ApplicantRepository;
import com.example.ServiceLink.repository.PostRepository;
import com.example.ServiceLink.repository.UserRepository;
import com.example.ServiceLink.service.ApplicantService;
import com.example.ServiceLink.util.CommonUtil;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
public class ApplicantServiceImpl implements ApplicantService {

    @Autowired
    private CommonUtil commonUtil;

    @Autowired
    private ApplicantRepository applicantRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private MessageSource messageSource;


    @Override
    public void applyForJobPost(ApplicantRequestDTO applicantRequestDTO) {

        byte[] applicantStatus={Applicant.Status.APPLIED.value};
        Applicant applicant=applicantRepository.findByUserIdAndJobPostIdAndStatusIn(applicantRequestDTO.getUserId(),applicantRequestDTO.getJobPostId(),applicantStatus);
        if(applicant!=null){
            throw new BadRequestException(messageSource.getMessage("APPLICANT_ALREADY_EXISTS", null, Locale.ENGLISH));
        }

        byte[] userStatus={User.Status.ACTIVE.value};
        User user=userRepository.findByIdAndStatusIn(applicantRequestDTO.getUserId(),userStatus).orElseThrow(
                ()->new BadRequestException(messageSource.getMessage("APPLICANT_NOT_FOUND", null, Locale.ENGLISH)));

        byte[] postStatus={JobPost.Status.ACTIVE.value};
        JobPost jobPost=postRepository.findByIdAndStatusIn(applicantRequestDTO.getJobPostId(),postStatus).orElseThrow(
                ()->new BadRequestException(messageSource.getMessage("APPLICATION_NOT_FOUND", null, Locale.ENGLISH)));


        applicantRepository.save(new Applicant(user,jobPost));
    }

    @Override
    public PagedResponseDTO<ApplicantListResponseDTO> getAllApplicantWithFilter(
            String jobPostId,
            String searchKeyword,
            String status,
            String sortBy,
            String sortOrder,
            Pageable pageable) {

        // Convert status to byte array (assuming status is provided as a comma-separated string)
        byte[] statusArray = parseStatusToBytes(status);

        // Define sorting (default sorting by "createdDate" if none provided)
        Sort sort = Sort.by(Sort.Direction.fromString(sortOrder), sortBy != null ? sortBy : "createdDate");
        Pageable paging = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort);

        // Fetch applicants by job post ID and status
        List<Applicant> applicants = applicantRepository.findByJobPostIdAndStatusIn(Integer.valueOf(jobPostId), statusArray);

        // If you want to apply search filtering based on applicant's name or email
        List<Applicant> filteredApplicants = applicants.stream()
                .filter(applicant -> {
                    if (searchKeyword == null || searchKeyword.trim().isEmpty()) {
                        // If the search keyword is null or empty, return true for all applicants
                        return true;
                    }
                    else {
                        String name = applicant.getUser().getName();
                        String email = applicant.getUser().getEmail();
                        return name.contains(searchKeyword) || email.contains(searchKeyword);
                    }
                })
                .collect(Collectors.toList());

        // Get paginated results (manual pagination because we fetched a list first)
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), filteredApplicants.size());
        List<Applicant> paginatedApplicants = filteredApplicants.subList(start, end);

        // Map entity to DTO
        List<ApplicantListResponseDTO> applicantDTOList = paginatedApplicants.stream()
                .map(this::mapToApplicantListResponseDTO)
                .collect(Collectors.toList());

        // Create the response with pagination details
        PagedResponseDTO<ApplicantListResponseDTO> response = new PagedResponseDTO<>(
                applicantDTOList,
                (int) Math.ceil((double) filteredApplicants.size() / pageable.getPageSize()), // Total pages
                filteredApplicants.size(), // Total items
                pageable.getPageNumber()
        );

        return response;
    }

    @Override
    public boolean hasUserAppliedForJob(ApplicantRequestDTO applicantRequestDTO) {
        byte[] applicantStatus={Applicant.Status.APPLIED.value};

        Applicant applicant=applicantRepository.findByUserIdAndJobPostIdAndStatusIn(applicantRequestDTO.getUserId(),applicantRequestDTO.getJobPostId(),applicantStatus);
        return applicant != null;
    }

    @Override
    public void deleteApplicantById(Long id) {
        byte[] applicantStatus={Applicant.Status.APPLIED.value};
        Applicant applicant=applicantRepository.findByIdAndStatusIn(Math.toIntExact(id),applicantStatus).orElseThrow(
                ()->new BadRequestException(messageSource.getMessage("APPLICANT_NOT_FOUND", null, Locale.ENGLISH)));
        byte[] postStatus={JobPost.Status.ACTIVE.value};
        JobPost jobPost=postRepository.findByIdAndStatusIn(applicant.getJobPost().getId(),postStatus).orElseThrow(
                ()-> new BadRequestException(messageSource.getMessage("APPLICATION_NOT_FOUND",null,Locale.ENGLISH)));
        applicant.setStatus(Applicant.Status.REJECTED.value);
        applicantRepository.save(applicant);
    }


    private ApplicantListResponseDTO mapToApplicantListResponseDTO(Applicant applicant) {
        ApplicantListResponseDTO dto = new ApplicantListResponseDTO();
        dto.setId(applicant.getId().intValue());
        dto.setApplicantName(applicant.getUser().getName());
        dto.setEmail(applicant.getUser().getEmail());
        dto.setExperience( "1"); // Assuming experience is stored in User applicant.getUser().getExperience()
        dto.setCreateDate(applicant.getCreatedDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate());
        dto.setStatus(applicant.getStatus());
        return dto;
    }

    private byte[] parseStatusToBytes(String status) {
        if (status == null || status.isEmpty()) {
            return new byte[0]; // Default empty if status is not provided
        }
        String[] statusStrings = status.split(",");
        byte[] statusArray = new byte[statusStrings.length];
        for (int i = 0; i < statusStrings.length; i++) {
            statusArray[i] = Byte.parseByte(statusStrings[i]);
        }
        return statusArray;
    }



}
