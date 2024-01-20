package com.example.medisyncpro.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class CreateAppointmentDto {
    private Long patientId;
    private Long doctorId;
    private Long clinicId;
    private Date date;
    private String timeSlot;
    private Long serviceId;
}
