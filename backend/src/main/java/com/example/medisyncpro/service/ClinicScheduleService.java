package com.example.medisyncpro.service;

import com.example.medisyncpro.model.ClinicSchedule;

import java.util.List;

public interface ClinicScheduleService {

    ClinicSchedule getById(Long id);

    List<ClinicSchedule> getAll();

    ClinicSchedule save(ClinicSchedule clinicSchedule);

    void delete(Long id);
}

