package com.example.medisyncpro.service;

import com.example.medisyncpro.dto.CreateClinicServicesDto;
import com.example.medisyncpro.model.ClinicServices;

import java.util.List;

public interface ClinicServicesService {

    ClinicServices getById(Long id);

    List<ClinicServices> getAll();

    ClinicServices save(CreateClinicServicesDto clinicServices);
    ClinicServices update(ClinicServices clinicServices);

    void delete(Long id);
}
