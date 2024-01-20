package com.example.medisyncpro.service;

import com.example.medisyncpro.dto.CreateClinicSchedulesDto;
import com.example.medisyncpro.model.ClinicSchedule;

import java.util.List;

public interface ClinicScheduleService {

    ClinicSchedule getById(Long id);

    List<ClinicSchedule> getAll();

    ClinicSchedule save(CreateClinicSchedulesDto clinicSchedule);
    ClinicSchedule update(ClinicSchedule clinicSchedule);

    void delete(Long id);
}

