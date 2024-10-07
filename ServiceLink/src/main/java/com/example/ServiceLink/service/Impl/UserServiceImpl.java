package com.example.ServiceLink.service.Impl;

import com.example.ServiceLink.entity.Applicant;
import com.example.ServiceLink.entity.Role;
import com.example.ServiceLink.entity.User;
import com.example.ServiceLink.entity.dto.requestDTO.*;
import com.example.ServiceLink.entity.dto.responseDTO.JwtResponseDTO;
import com.example.ServiceLink.exceptionhandler.BadRequestException;
import com.example.ServiceLink.repository.ApplicantRepository;
import com.example.ServiceLink.repository.RoleRepository;
import com.example.ServiceLink.repository.UserRepository;
import com.example.ServiceLink.security.JwtUserDetailsService;
import com.example.ServiceLink.security.TokenManager;
import com.example.ServiceLink.service.EmailService;
import com.example.ServiceLink.service.UserService;
import com.example.ServiceLink.util.CommonUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {


    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUserDetailsService jwtUserDetailsService;
    private final MessageSource messageSource;
    private final RoleRepository roleRepository;
    private final CommonUtil commonUtil;
    private final EmailService emailService;
    private final TokenManager tokenManager;
    private final ApplicantRepository applicantRepository;

    private final byte[] userStatus = {User.Status.ACTIVE.value};
    private final byte[] userStatusCheck = {User.Status.ACTIVE.value,User.Status.OTP_VERIFY.value};

    @Override
    public void addUser(UserRequestDTO userRequestDTO) {

        // Check if both phone number and email are null
        if (userRequestDTO.getPhoneNumber() == null && userRequestDTO.getEmail() == null) {
            throw new BadRequestException(messageSource.getMessage("EMAIL_PHONE_REQUIRED", null, Locale.ENGLISH));
        }

        Optional<User> existingUser;
        if (userRequestDTO.getEmail() != null) {
            existingUser = userRepository.findByEmailAndStatusIn(userRequestDTO.getEmail(), userStatusCheck);
        } else {
            existingUser = userRepository.findByPhoneAndStatusIn(userRequestDTO.getPhoneNumber(), userStatusCheck);
        }
        commonUtil.validationAddUser();
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            if (user.getStatus() != User.Status.ACTIVE.value) {
                // User exists but is not active, so send OTP
                if (userRequestDTO.getEmail() != null) {
                    commonUtil.validateEmail(userRequestDTO);
                } else {
                    commonUtil.validatePhoneNumber(userRequestDTO);
                }
                // Exit after sending OTP
            } else {
                // User is active, handle according to your business logic (e.g., throw an error)
                throw new BadRequestException(messageSource.getMessage("EMAIL_PHONE_ALREADY_EXISTS", null, Locale.ENGLISH));
            }
        } else {

            // Encode the password
            userRequestDTO.setPassword(passwordEncoder.encode(userRequestDTO.getPassword()));

            // Validate and process phone number and email
            commonUtil.validatePhoneNumber(userRequestDTO);
            commonUtil.validateEmail(userRequestDTO);

            // Find the role
            Role role = roleRepository.findById(4).orElseThrow(() -> new BadRequestException(messageSource.getMessage("ROLE_NOT_FOUND", null, Locale.ENGLISH)));

            // Save the user
            userRepository.save(new User(userRequestDTO, role));


        }
    }

    @Override
    public ResponseEntity<Object> login(LoginRequestDTO loginRequestDTO) {
        Optional<User> optUser;
        if (jwtUserDetailsService.isEmail(loginRequestDTO.getUsername())) {
            optUser = userRepository.findByEmailAndStatus(loginRequestDTO.getUsername(), User.Status.ACTIVE.value);
        } else {
            optUser = userRepository.findByPhoneAndStatus(loginRequestDTO.getUsername(), User.Status.ACTIVE.value);
        }
        if (optUser.isEmpty()){
            throw new BadRequestException(
                    messageSource.getMessage("EMAIL_PHONE_NOT_FOUND", null, Locale.ENGLISH));
        }
        UserDetails userDetails =
                jwtUserDetailsService.loadUserByUsername(loginRequestDTO.getUsername());

        if (!passwordEncoder.matches(loginRequestDTO.getPassword(), optUser.get().getPassword())) {
            throw new BadRequestException(
                    messageSource.getMessage("PASSWORD_NOT_MATCH", null, Locale.ENGLISH));
        }
        UsernamePasswordAuthenticationToken userPass =
                new UsernamePasswordAuthenticationToken(
                        userDetails.getUsername(), null, userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(userPass);


        JwtResponseDTO jwtResponseDTO = tokenManager.generateJwtToken(userDetails);
        jwtResponseDTO.setUserName(optUser.get().getName());
        jwtResponseDTO.setRole(optUser.get().getRole().getId());
        jwtResponseDTO.setId(userDetails.getUsername());
        jwtResponseDTO.setUserId(optUser.get().getId());
        return new ResponseEntity<>(jwtResponseDTO, HttpStatus.OK);
    }

    @Override
    public User getUserDetail(Integer id,byte status) {
        Integer userId=0;
        if (status==1){
            byte[] applicantStatus={Applicant.Status.APPLIED.value,Applicant.Status.REJECTED.value};
            Applicant applicant=applicantRepository.findByIdAndStatusIn(id,applicantStatus).orElseThrow(
                    ()->new BadRequestException(messageSource.getMessage("APPLICANT_NOT_FOUND", null, Locale.ENGLISH)));

            userId= Math.toIntExact(applicant.getUser().getId());
        }
        else {
            userId=id;
        }

        byte[] userStatus={User.Status.ACTIVE.value};

        return userRepository.findByIdAndStatusIn(userId, userStatus).orElseThrow(() -> new BadRequestException(messageSource.getMessage("USER_NOT_FOUND", null, Locale.ENGLISH)));
    }

    @Override
    public void changePassword(Integer id, ChangePasswordDTO changePasswordDTO) {

        byte[] userStatus={User.Status.ACTIVE.value};
        User user=userRepository.findByIdAndStatusIn(id,userStatus).orElseThrow(() -> new BadRequestException(messageSource.getMessage("USER_NOT_FOUND", null, Locale.ENGLISH)));

        if (!passwordEncoder.matches(changePasswordDTO.getOldPassword(), user.getPassword())){
            throw new BadRequestException(
                    messageSource.getMessage("CURRENT_PASSWORD_MISMATCH", null, Locale.ENGLISH));
        }
        if (!changePasswordDTO.getNewPassword().equals(changePasswordDTO.getConfirmPassword())){
            throw new BadRequestException(
                    messageSource.getMessage("NEW_PASSWORD_MISMATCH", null, Locale.ENGLISH));
        }
        user.setPassword(passwordEncoder.encode(changePasswordDTO.getNewPassword()));
        userRepository.save(user);

    }

    @Override
    public void editProfile(Integer id, CompanyEditProfileDTO companyEditProfileDTO) {
        byte[] userStatus={User.Status.ACTIVE.value};
        User user=userRepository.findByIdAndStatusIn(id,userStatus).orElseThrow(() -> new BadRequestException(messageSource.getMessage("USER_NOT_FOUND", null, Locale.ENGLISH)));

        user.setCompanyName(companyEditProfileDTO.getCompanyName());
        user.setProfileSummary(companyEditProfileDTO.getProfileSummary());
        user.setWebsite(companyEditProfileDTO.getWebsite());
        user.setLocation(companyEditProfileDTO.getLocation());
        user.setEmail(companyEditProfileDTO.getEmail());
        user.setPhone(companyEditProfileDTO.getPhone());
        user.setAddress(companyEditProfileDTO.getAddress());
        userRepository.save(user);
    }

    @Override
    public void deleteProfile(Integer id) {
        byte[] userStatus={User.Status.ACTIVE.value};
        User user=userRepository.findByIdAndStatusIn(id,userStatus).orElseThrow(() -> new BadRequestException(messageSource.getMessage("USER_NOT_FOUND", null, Locale.ENGLISH)));
        user.setStatus(User.Status.DELETED.value);
        userRepository.save(user);
    }

    @Override
    public void editEmployeeProfile(Integer id, EmployeeEditProfileDTO employeeEditProfileDTO) {
        byte[] userStatus={User.Status.ACTIVE.value};
        User user=userRepository.findByIdAndStatusIn(id,userStatus).orElseThrow(() -> new BadRequestException(messageSource.getMessage("USER_NOT_FOUND", null, Locale.ENGLISH)));
        user.setName(employeeEditProfileDTO.getName());
        user.setTitle(employeeEditProfileDTO.getTitle());
        user.setProfileSummary(employeeEditProfileDTO.getProfileSummary());
        user.setEducation(employeeEditProfileDTO.getEducation());
        user.setLocation(employeeEditProfileDTO.getLocation());
        user.setWebsite(employeeEditProfileDTO.getWebsite());
        user.setAddress(employeeEditProfileDTO.getAddress());
        user.setExperience(employeeEditProfileDTO.getExperience());
        userRepository.save(user);
    }


}
