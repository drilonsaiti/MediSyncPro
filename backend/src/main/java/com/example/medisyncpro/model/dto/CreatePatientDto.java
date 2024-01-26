package com.example.medisyncpro.model.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreatePatientDto {
    private String patientName;

    private String gender;

    private String address;

    private String contactNumber;

    private String email;

    private LocalDate birthDay;
}
