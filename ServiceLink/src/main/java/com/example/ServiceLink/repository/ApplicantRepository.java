package com.example.ServiceLink.repository;

import com.example.ServiceLink.entity.Applicant;
import com.twilio.rest.microvisor.v1.App;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicantRepository extends JpaRepository<Applicant ,Integer> {

    Applicant findByUserIdAndJobPostIdAndStatusIn(Integer userId, Integer jobPostId,byte[] status);

    List<Applicant>findByJobPostIdAndStatusIn(Integer jobPostId,byte[] status);
    Optional<Applicant>findByIdAndStatusIn(Integer id, byte[] status);

}
