package com.example.medisyncpro.model.mapper;

import com.example.medisyncpro.model.Clinic;
import com.example.medisyncpro.model.ClinicServices;
import com.example.medisyncpro.model.Settings;
import com.example.medisyncpro.model.Specializations;
import com.example.medisyncpro.model.dto.ClinicDto;
import com.example.medisyncpro.model.dto.ServiceBySpecializationIdDto;
import com.example.medisyncpro.service.ClinicService;
import com.example.medisyncpro.service.ClinicServicesService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ClinicMapper {

    private final ClinicServicesService service;
    private List<ServiceBySpecializationIdDto> services(List<ClinicServices> services){

        return services.stream().map(s -> new ServiceBySpecializationIdDto(
                s.getSpecializations().getSpecializationId(),
                s.getServiceName()
        )).toList();
    }

    public ClinicDto getClinicDto(Clinic clinic, Settings settings){
        return new ClinicDto(
                clinic.getClinicId(),
                clinic.getClinicName(),
                clinic.getAddress(),
                clinic.getSpecializations(),
                services(clinic.getServices()),
                clinic.getDoctors(),
                settings.getMorningStartTime().toString() + "-" + settings.getMorningEndTime(),
                settings.getAfternoonStartTime().toString() + "-" + settings.getAfternoonEndTime()
        );
    }
}
