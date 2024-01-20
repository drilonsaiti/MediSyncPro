package com.example.medisyncpro.dto;

import com.example.medisyncpro.model.Doctor;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class CreateMedicalReportDto {

    private Long patientId;

    private Long doctorId;

    private String medicineName;

    private Integer quantity;

    private String disease;

    private String analyses;

    private Date nextAppointmentDate;

    private Integer noOfDays;

    private Date appointmentDate;
}
