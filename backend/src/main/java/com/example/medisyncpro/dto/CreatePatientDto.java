package com.example.medisyncpro.dto;

import jakarta.persistence.Column;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreatePatientDto {
    private String patientName;

    private String gender;

    private String address;

    private String contactNumber;

    private String email;

    private Integer age;
}
