package com.example.medisyncpro.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreateReceptionistDto {

    private String receptionistName;


    private String emailAddress;


    private Long clinicId;

}
