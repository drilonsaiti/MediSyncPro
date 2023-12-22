package com.example.medisyncpro.model;
import jakarta.persistence.*;
import lombok.Data;
@Data
@Entity
@Table(name = "RECEPTIONIST")
public class Receptionist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "receptionist_id")
    private Long receptionistId;

    @Column(name = "receptionist_name", nullable = false)
    private String receptionistName;

    @Column(name = "email_address", nullable = false)
    private String emailAddress;

    @Column(name = "clinic_id")
    private Long clinicId;
}

