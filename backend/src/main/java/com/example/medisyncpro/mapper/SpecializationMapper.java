package com.example.medisyncpro.mapper;

import com.example.medisyncpro.dto.CreateSpecializationDto;
import com.example.medisyncpro.model.Specializations;
import org.springframework.stereotype.Service;

@Service
public class SpecializationMapper {

    public Specializations createSpecialization(CreateSpecializationDto dto){
        return new Specializations(dto.getSpecializationName());
    }
}
