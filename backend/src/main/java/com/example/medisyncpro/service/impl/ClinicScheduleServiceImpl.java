package com.example.medisyncpro.service.impl;

import com.example.medisyncpro.model.Doctor;
import com.example.medisyncpro.model.Settings;
import com.example.medisyncpro.model.dto.CreateClinicSchedulesDto;
import com.example.medisyncpro.model.mapper.ClinicScheduleMapper;
import com.example.medisyncpro.model.ClinicSchedule;
import com.example.medisyncpro.repository.ClinicScheduleRepository;
import com.example.medisyncpro.service.ClinicScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
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

    public List<ClinicSchedule> generateSchedules(Settings settings) {
        List<ClinicSchedule> schedules = new ArrayList<>();
        LocalDate currentDate = LocalDate.now();

        for (int i = 0; i < settings.getDaysToGenerate(); i++) {
            LocalDateTime currentDateTime = LocalDateTime.of(currentDate, settings.getMorningStartTime().toLocalTime());

            while (currentDateTime.isBefore(LocalDateTime.of(currentDate, settings.getMorningEndTime().toLocalTime()))) {
                for (Doctor doctor : settings.getMorningDoctors()) {
                    ClinicSchedule schedule = ClinicScheduleMapper.mapToClinicSchedule(doctor, currentDate, currentDateTime, settings.getAppointmentDurationMinutes());

                    schedules.add(schedule);
                }
                currentDateTime = currentDateTime.plusMinutes(settings.getAppointmentDurationMinutes());
            }

            currentDateTime = LocalDateTime.of(currentDate, settings.getAfternoonStartTime().toLocalTime());

            while (currentDateTime.isBefore(LocalDateTime.of(currentDate, settings.getAfternoonEndTime().toLocalTime()))) {
                for (Doctor doctor : settings.getAfternoonDoctors()) {
                    ClinicSchedule schedule = ClinicScheduleMapper.mapToClinicSchedule(doctor, currentDate, currentDateTime, settings.getAppointmentDurationMinutes());
                    schedules.add(schedule);
                }
                currentDateTime = currentDateTime.plusMinutes(settings.getAppointmentDurationMinutes());
            }

            currentDate = currentDate.plusDays(1);
        }
        this.clinicScheduleRepository.saveAll(schedules);
        return schedules;
    }
}

