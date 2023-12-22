package com.example.medisyncpro.service;

import com.example.medisyncpro.model.ClinicServices;

import java.util.List;

public interface ServiceService {

    ClinicServices getById(Long id);

    List<ClinicServices> getAll();

    ClinicServices save(ClinicServices clinicServices);

    void delete(Long id);
}
