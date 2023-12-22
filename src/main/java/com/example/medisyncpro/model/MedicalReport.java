package com.example.medisyncpro.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
@Table(name = "MEDICAL_REPORT")
public class MedicalReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "report_id")
    private Long reportId;

    @Column(name = "patient_id")
    private Long patientId;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    @Column(name = "medicine_name", nullable = false)
    private String medicineName;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @Column(name = "disease")
    private String disease;

    @Column(name = "analyses")
    private String analyses;

    @Column(name = "next_appointment_date")
    private Date nextAppointmentDate;

    @Column(name = "no_of_days")
    private Integer noOfDays;

    @Column(name = "appointment_date")
    private Date appointmentDate;
}
