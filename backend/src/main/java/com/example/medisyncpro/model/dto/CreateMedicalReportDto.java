package com.example.medisyncpro.model.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class CreateMedicalReportDto {

    private Long patientId;

    private Long doctorId;

    private String medicineName;

    private String disease;

    private LocalDateTime nextAppointmentDate;
    private Integer noOfDays;

    private Long appointmentId;
}
