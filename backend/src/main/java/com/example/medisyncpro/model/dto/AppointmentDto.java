package com.example.medisyncpro.model.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentDto {

    private Long appointmentId;
private Long patientId;
    private String patientName;
    private String patientEmail;

    private String doctorName;
    private String doctorSpecializations;

    private LocalDateTime date;

    private List<String> serviceName;


    private boolean attended;
}
