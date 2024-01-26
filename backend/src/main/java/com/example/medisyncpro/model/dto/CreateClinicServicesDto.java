package com.example.medisyncpro.model.dto;

import com.example.medisyncpro.model.Specializations;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
public class CreateClinicServicesDto {


    private String serviceName;


    private Integer durationMinutes;


    private BigDecimal price;

    private Long specializationsId;
}
