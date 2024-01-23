package com.example.medisyncpro.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentDateDto {
    LocalDateTime startDate;
    /*LocalDateTime endDate;*/
}
