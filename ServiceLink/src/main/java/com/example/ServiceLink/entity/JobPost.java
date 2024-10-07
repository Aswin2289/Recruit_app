package com.example.ServiceLink.entity;

import com.example.ServiceLink.entity.dto.requestDTO.PostRequestDTO;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "job_post")
public class JobPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String location;
    private String salaryRange;
    private String companyName;
    private byte jobType;
    private String experience;
    private LocalDate postDate;
    private LocalDate applicationDeadline;

    @Column(name = "status")
    private byte status;

    @ElementCollection
    @CollectionTable(name = "job_post_shifts", joinColumns = @JoinColumn(name = "job_post_id"))
    @Column(name = "shift")
    private Set<Byte> shift;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(optional = false, fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date createdDate;

    @Temporal(TemporalType.TIMESTAMP)
    @UpdateTimestamp
    private Date updatedDate;

    public enum Status {
        ACTIVE((byte) 0), INACTIVE((byte) 1), DELETED((byte) 2), BLOCKED((byte) 3), PENDING((byte) 4);

        public final byte value;

        Status(byte value) {
            this.value = value;
        }
    }

    public enum JobType {
        FULL_TIME((byte) 0), PART_TIME((byte) 1), INTERNSHIP((byte) 2), CONTRACT((byte) 3);

        public final byte value;

        JobType(byte value) {
            this.value = value;
        }
    }

    public enum Shift {
        BREAKFAST((byte) 0), LUNCH((byte) 1), DINNER((byte) 2), NIGHT((byte) 3);

        public final byte value;

        Shift(byte value) {
            this.value = value;
        }
    }

    public JobPost(PostRequestDTO postRequestDTO, User user) {
        this.title = postRequestDTO.getTitle();
        this.description = postRequestDTO.getDescription();
        this.location = postRequestDTO.getLocation();
        this.salaryRange = postRequestDTO.getSalaryRange();
        this.companyName = postRequestDTO.getCompanyName();
        this.jobType = postRequestDTO.getJobType();
        this.experience = postRequestDTO.getExperience();
        this.postDate = LocalDate.now();
        this.applicationDeadline = postRequestDTO.getApplicationDeadline();
        this.status = Status.PENDING.value;
        this.user = user;
        System.out.println("Post request"+postRequestDTO.getShift());
        // Convert Set<String> to Set<Byte> when initializing the shift
        this.shift = (postRequestDTO.getShift() != null && !postRequestDTO.getShift().isEmpty())
                ? postRequestDTO.getShift().stream()
                .map(Byte::parseByte) // Convert each String to Byte
                .collect(Collectors.toSet())
                : new HashSet<>();
    }
}
