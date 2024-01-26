package com.example.medisyncpro.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
public class Settings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(mappedBy = "settings")
    private Clinic clinic;

    @Column(name = "morning_start_time")
    private LocalDateTime morningStartTime;

    @Column(name = "morning_end_time")
    private LocalDateTime morningEndTime;

    @Column(name = "afternoon_start_time")
    private LocalDateTime afternoonStartTime;

    @Column(name = "afternoon_end_time")
    private LocalDateTime afternoonEndTime;

    @Column(name = "appointment_duration_minutes")
    private int appointmentDurationMinutes;

    @Column(name = "days_to_generate")
    private int daysToGenerate;

    @ManyToMany
    @JoinTable(
            name = "settings_morning_doctors",
            joinColumns = @JoinColumn(name = "settings_id"),
            inverseJoinColumns = @JoinColumn(name = "doctor_id")
    )
    private List<Doctor> morningDoctors;

    @ManyToMany
    @JoinTable(
            name = "settings_afternoon_doctors",
            joinColumns = @JoinColumn(name = "settings_id"),
            inverseJoinColumns = @JoinColumn(name = "doctor_id")
    )
    private List<Doctor> afternoonDoctors;

    // Getters and setters
}

