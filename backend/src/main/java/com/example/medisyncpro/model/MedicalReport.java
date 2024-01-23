package com.example.medisyncpro.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@Entity
@Table(name = "MEDICAL_REPORT")
@NoArgsConstructor

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
    private LocalDateTime nextAppointmentDate;

    @Column(name = "no_of_days")
    private Integer noOfDays;

    @Column(name = "appointment_date")
    private LocalDateTime appointmentDate;

    public MedicalReport(Long patientId, Doctor doctor, String medicineName, Integer quantity, String disease, String analyses, LocalDateTime nextAppointmentDate, Integer noOfDays, LocalDateTime appointmentDate) {
        this.patientId = patientId;
        this.doctor = doctor;
        this.medicineName = medicineName;
        this.quantity = quantity;
        this.disease = disease;
        this.analyses = analyses;
        this.nextAppointmentDate = nextAppointmentDate;
        this.noOfDays = noOfDays;
        this.appointmentDate = appointmentDate;
    }
}
