package com.example.ServiceLink.entity;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;
@Data
@Entity
@Table(name = "applicant")
@NoArgsConstructor
public class Applicant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private byte status;
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(optional = false, fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(optional = false, fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "job_post_id", referencedColumnName = "id")
    private JobPost jobPost;

    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date createdDate;

    @Temporal(TemporalType.TIMESTAMP)
    @UpdateTimestamp
    private Date updatedDate;

    public enum Status {
        NOT_APPLIED((byte) 0), APPLIED((byte) 1),DELETED((byte) 2),REJECTED((byte) 3);

        public final byte value;

        Status(byte value) {
            this.value = value;
        }
    }


    public Applicant(User user, JobPost jobPost){
        this.user = user;
        this.jobPost = jobPost;
        this.status = Status.APPLIED.value;

    }
}
