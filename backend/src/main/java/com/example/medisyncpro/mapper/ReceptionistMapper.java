package com.example.medisyncpro.mapper;

import com.example.medisyncpro.dto.CreateReceptionistDto;
import com.example.medisyncpro.model.Receptionist;
import org.springframework.stereotype.Service;

@Service
public class ReceptionistMapper {

    public Receptionist createReceptionist(CreateReceptionistDto dto){
        return new Receptionist(dto.getReceptionistName(), dto.getEmailAddress(), dto.getClinicId());
    }
}
