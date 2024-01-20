package com.example.medisyncpro.service.impl;

import com.example.medisyncpro.dto.CreateClinicSchedulesDto;
import com.example.medisyncpro.mapper.ClinicScheduleMapper;
import com.example.medisyncpro.model.ClinicSchedule;
import com.example.medisyncpro.repository.ClinicScheduleRepository;
import com.example.medisyncpro.service.ClinicScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
@RequiredArgsConstructor
@Service
public class ClinicScheduleServiceImpl implements ClinicScheduleService {


    private final ClinicScheduleRepository clinicScheduleRepository;
    private final ClinicScheduleMapper scheduleMapper;

    @Override
    public ClinicSchedule getById(Long id) {
        return clinicScheduleRepository.findById(id).orElse(null);
    }

    @Override
    public List<ClinicSchedule> getAll() {
        return clinicScheduleRepository.findAll();
    }

    @Override
    public ClinicSchedule save(CreateClinicSchedulesDto clinicSchedule) {
        return clinicScheduleRepository.save(scheduleMapper.createClinicSchedule(clinicSchedule));
    }

    @Override
    public ClinicSchedule update(ClinicSchedule clinicSchedule) {
        ClinicSchedule old = this.getById(clinicSchedule.getScheduleId());
        return clinicScheduleRepository.save(scheduleMapper.updateClinicSchedule(old,clinicSchedule));
    }

    @Override
    public void delete(Long id) {
        clinicScheduleRepository.deleteById(id);
    }
}

