package com.example.medisyncpro.model;

import jakarta.persistence.*;
import lombok.Data;


@Data
@Entity
@Table(name = "SPECIALIZATION")
public class Specialization {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "specialization_id")
    private Long specializationId;

    @Column(name = "specialization_name", nullable = false)
    private String specializationName;
}