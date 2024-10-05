package com.example.ServiceLink.repository.repositoryImpl;

import com.example.ServiceLink.entity.JobPost;
import com.example.ServiceLink.repository.PostCritieriaRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

@Repository
public class PostCritieriaRepositoryImpl implements PostCritieriaRepository {

    @PersistenceContext
    private final EntityManager entityManager;

    private static final String SEPARATOR = ",";
    private static final Logger LOGGER = Logger.getLogger(PostCritieriaRepositoryImpl.class.getName());

    public PostCritieriaRepositoryImpl(EntityManager entityManager){
        this.entityManager = entityManager;
    }

    @Override
    public Page<JobPost> getAllJobPostWithFilter(String searchKeyword, String jobType, String experience, String salaryRange, String status, String sortBy, String sortOrder, Pageable pageable) {
        try {
            CriteriaBuilder cb = entityManager.getCriteriaBuilder();
            CriteriaQuery<JobPost> query = cb.createQuery(JobPost.class);
            Root<JobPost> jobPostRoot = query.from(JobPost.class);

            // Create predicates list
            List<Predicate> predicates = new ArrayList<>();

            // Search keyword filtering
            if (searchKeyword != null && !searchKeyword.isEmpty()) {
                predicates.add(
                        cb.or(
                                cb.like(cb.lower(jobPostRoot.get("title")), "%" + searchKeyword.toLowerCase() + "%"),
//                                cb.like(cb.lower(root.get("modal")), "%" + searchKeyword.toLowerCase() + "%"),
                                cb.like(cb.lower(jobPostRoot.get("companyName")), "%" + searchKeyword.toLowerCase() + "%")));
            }

            // Experience filtering
//            if (StringUtils.hasText(experience)) {
//                predicates.add(cb.equal(jobPostRoot.get("experience"), experience));
//            }
//
//            // Salary range filtering
//            if (StringUtils.hasText(salaryRange)) {
//                predicates.add(cb.equal(jobPostRoot.get("salaryRange"), salaryRange));
//            }

            // Status filtering
            if (!StringUtils.isEmpty(status)) {
                String[] statusArray = status.split(SEPARATOR);
                List<Byte> statusBytes = new ArrayList<>();
                for (String statusValue : statusArray) {
                    statusBytes.add(Byte.parseByte(statusValue));
                }
                predicates.add(jobPostRoot.get("status").in(statusBytes));
            }
            if (!StringUtils.isEmpty(jobType)) {
                String[] statusArray = jobType.split(SEPARATOR);
                List<Byte> statusBytes = new ArrayList<>();
                for (String statusValue : statusArray) {
                    statusBytes.add(Byte.parseByte(statusValue));
                }
                predicates.add(jobPostRoot.get("jobType").in(statusBytes));
            }

            // Apply predicates to query
            query.where(cb.and(predicates.toArray(new Predicate[0])));

            // Apply sorting
            if (sortBy != null && !sortBy.isEmpty()) {
                if ("asc".equalsIgnoreCase(sortOrder)) {
                    query.orderBy(cb.asc(jobPostRoot.get(sortBy)));
                } else if ("desc".equalsIgnoreCase(sortOrder)) {
                    query.orderBy(cb.desc(jobPostRoot.get(sortBy)));
                }
            } else {
                query.orderBy(cb.desc(jobPostRoot.get("postDate")));
            }

            List<JobPost>resultList=entityManager
                    .createQuery(query)
                    .setFirstResult((int) pageable.getOffset())
                    .setMaxResults(pageable.getPageSize())
                    .getResultList();
            // Create query and set pagination
            CriteriaBuilder countCb = entityManager.getCriteriaBuilder();
            CriteriaQuery<Long> countQuery = countCb.createQuery(Long.class);
            Root<JobPost> countRoot = countQuery.from(JobPost.class);
            countQuery.select(countCb.count(countRoot));

            // Execute query
            List<Predicate> countPredicates = new ArrayList<>();
            if (!StringUtils.isEmpty(status)) {
                String[] statusArray = status.split(SEPARATOR);
                List<Byte> statusBytes = new ArrayList<>();
                for (String statusValue : statusArray) {
                    statusBytes.add(Byte.parseByte(statusValue));
                }
                countPredicates.add(countRoot.get("status").in(statusBytes));
            }
            if (!StringUtils.isEmpty(jobType)) {
                String[] statusArray = jobType.split(SEPARATOR);
                List<Byte> statusBytes = new ArrayList<>();
                for (String statusValue : statusArray) {
                    statusBytes.add(Byte.parseByte(statusValue));
                }
                countPredicates.add(countRoot.get("jobType").in(statusBytes));
            }
            if (!countPredicates.isEmpty()) {
                countQuery.where(countPredicates.toArray(new Predicate[0]));
            }
            // Return page result
            TypedQuery<Long> typedCountQuery = entityManager.createQuery(countQuery);
            long totalCount = typedCountQuery.getSingleResult();
            return new PageImpl<>(resultList, pageable, totalCount);

        } catch (Exception e) {
            LOGGER.severe("Error occurred while fetching job posts with filters: " + e.getMessage());
            throw e;
        }
    }
}
