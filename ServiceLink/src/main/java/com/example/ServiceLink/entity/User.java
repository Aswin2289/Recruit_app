package com.example.ServiceLink.entity;

import com.example.ServiceLink.entity.dto.requestDTO.UserRequestDTO;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;

@Data
@Entity
@Table(name = "user")
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    private String email;
    private String phone;
    private String password;

    private byte status;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(optional = false, fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "role_id", referencedColumnName = "id")
    private Role role;

    private String title;
    private String profileSummary;
    private String education;

    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date createdDate;

    @Temporal(TemporalType.TIMESTAMP)
    @UpdateTimestamp
    private Date updatedDate;

    public enum Status {
        // active-1 inactive(relieve)-0 exclude( permanent delete)-2
        INACTIVE((byte) 0), ACTIVE((byte) 1),DELETED((byte) 2), EXCLUDE((byte) 3), OTP_VERIFY((byte) 4),SUPER_ADMIN((byte) 5);

        public final byte value;

        Status(byte value) {
            this.value = value;
        }
    }


    public User(UserRequestDTO userRequestDTO, Role role) {
        this.name = userRequestDTO.getName();
        this.email = userRequestDTO.getEmail();
        this.phone = userRequestDTO.getPhoneNumber();
        this.password = userRequestDTO.getPassword();
        this.status = Status.OTP_VERIFY.value;
        this.role = role;
    }
}
