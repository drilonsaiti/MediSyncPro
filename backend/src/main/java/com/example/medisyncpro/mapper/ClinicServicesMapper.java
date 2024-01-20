package com.example.medisyncpro.mapper;

import com.example.medisyncpro.dto.CreateClinicServicesDto;
import com.example.medisyncpro.model.ClinicServices;
import com.example.medisyncpro.model.Specializations;
import org.springframework.stereotype.Service;

@Service
public class ClinicServicesMapper {

    public ClinicServices createClinicServices(CreateClinicServicesDto dto, Specializations specializations){
        return new ClinicServices(
                dto.getServiceName(),
                dto.getDurationMinutes(),
                dto.getPrice(),
                specializations
        );
    }

    public ClinicServices updateClinicServices(ClinicServices old,ClinicServices newServices){
        old.setServiceName(newServices.getServiceName());
        old.setDurationMinutes(newServices.getDurationMinutes());
        old.setPrice(newServices.getPrice());
        old.setSpecializations(newServices.getSpecializations());
        return old;
    }
}
