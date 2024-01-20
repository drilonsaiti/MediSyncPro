package com.example.medisyncpro.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreateDoctorDto {

    private String doctorName;


    private Long specializationId;

    private String education;

    private String workingDays;

    private Long clinicId;
}
