package com.example.ServiceLink.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@NoArgsConstructor
public class Role {
    @Id
    private Integer id;

    @Column(nullable = false, length = 50, unique = true)
    private String name;
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedDate;

    public Role(String name) {
        this.name = name;
    }

    public Role(Integer id, String name) {
        this.id=id;
        this.name = name;
    }
}
