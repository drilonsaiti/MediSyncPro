package com.example.medisyncpro.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "DOCTOR")
@NoArgsConstructor

public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "doctor_id")
    private Long doctorId;

    @Column(name = "doctor_name", nullable = false)
    private String doctorName;


    @ManyToOne
    @JoinColumn(name = "specialization_id")
    private Specializations specialization;

    @Column(name = "education")
    private String education;

    @Column(name = "working_days")
    private String workingDays;

    @ManyToOne
    @JoinColumn(name = "clinic_id")
    private Clinic clinic;

    @OneToMany(mappedBy = "doctor")
    private List<MedicalReport> medicalReports;

    public Doctor(String doctorName, Specializations specialization, String education, String workingDays, Clinic clinic) {
        this.doctorName = doctorName;
        this.specialization = specialization;
        this.education = education;
        this.workingDays = workingDays;
        this.clinic = clinic;
        this.medicalReports = new ArrayList<>();
    }
}