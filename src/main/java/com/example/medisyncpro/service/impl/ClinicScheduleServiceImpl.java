package com.example.medisyncpro.service.impl;

import com.example.medisyncpro.model.ClinicSchedule;
import com.example.medisyncpro.repository.ClinicScheduleRepository;
import com.example.medisyncpro.service.ClinicScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ClinicScheduleServiceImpl implements ClinicScheduleService {

    @Autowired
    private ClinicScheduleRepository clinicScheduleRepository;

    @Override
    public ClinicSchedule getById(Long id) {
        return clinicScheduleRepository.findById(id).orElse(null);
    }

    @Override
    public List<ClinicSchedule> getAll() {
        return clinicScheduleRepository.findAll();
    }

    @Override
    public ClinicSchedule save(ClinicSchedule clinicSchedule) {
        return clinicScheduleRepository.save(clinicSchedule);
    }

    @Override
    public void delete(Long id) {
        clinicScheduleRepository.deleteById(id);
    }
}

