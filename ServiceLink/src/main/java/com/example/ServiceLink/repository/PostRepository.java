package com.example.ServiceLink.repository;

import com.example.ServiceLink.entity.JobPost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<JobPost ,Integer> {

    Page<JobPost> findByUserIdAndStatusInAndTitleContainingIgnoreCase(
            Integer userId,
            byte[] status,
            String title,
            Pageable pageable);

    Page<JobPost> findByUserIdAndStatusIn(int intExact, byte[] jobPostStatus, Pageable pageable);


    Optional<JobPost> findByIdAndStatusInAndUserId(Long id, byte[] status, Long userId);

    Optional<JobPost> findByIdAndStatusIn(Integer id, byte[] status);
    Optional<JobPost> findByIdAndStatusIn(Long id, byte[] status);
}
