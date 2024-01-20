package com.example.medisyncpro.model;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Entity
@Table(name = "APPOINTMENT")
@NoArgsConstructor
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "appointment_id")
    private Long appointmentId;

    @Column(name = "patient_id", nullable = false)
    private Long patientId;

    @Column(name = "doctor_id", nullable = false)
    private Long doctorId;

    @Column(name = "clinic_id", nullable = false)
    private Long clinicId;

    @Column(name = "date", nullable = false)
    private Date date;

    @Column(name = "time_slot", nullable = false)
    private String timeSlot;

    @Column(name = "service_id", nullable = false)
    private Long serviceId;

    @Column(name = "attended", nullable = false)
    private boolean attended;

    public Appointment(Long patientId, Long doctorId, Long clinicId, Date date, String timeSlot, Long serviceId) {
        this.patientId = patientId;
        this.doctorId = doctorId;
        this.clinicId = clinicId;
        this.date = date;
        this.timeSlot = timeSlot;
        this.serviceId = serviceId;
        this.attended = false;
    }
}