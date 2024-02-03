package com.example.medisyncpro.service;

import com.example.medisyncpro.model.Clinic;
import com.example.medisyncpro.model.ClinicServices;
import com.example.medisyncpro.model.dto.ClinicDto;
import com.example.medisyncpro.model.dto.ClinicResultDto;
import org.springframework.data.domain.PageRequest;

import java.time.LocalDateTime;
import java.util.List;

public interface ClinicService {

    Clinic getById(Long id);
    ClinicDto getByIdDto(Long id);
    ClinicResultDto getAll(PageRequest pageable, String specializations, String service, String byDate);

    List<ClinicServices> getClinicServicesById(Long id);

    Clinic save(Clinic clinic);

    void delete(Long id);

    long getTotalClinicCount(String specialization,String status);
}

