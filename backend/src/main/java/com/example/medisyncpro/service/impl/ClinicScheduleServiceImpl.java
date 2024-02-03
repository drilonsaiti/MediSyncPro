package com.example.medisyncpro.service.impl;

import com.example.medisyncpro.model.Doctor;
import com.example.medisyncpro.model.Settings;
import com.example.medisyncpro.model.dto.ClinicScheduleDto;
import com.example.medisyncpro.model.dto.ClinicScheduleResultDto;
import com.example.medisyncpro.model.dto.CreateClinicSchedulesDto;
import com.example.medisyncpro.model.dto.GroupedClinicSchedule;
import com.example.medisyncpro.model.mapper.ClinicScheduleMapper;
import com.example.medisyncpro.model.ClinicSchedule;
import com.example.medisyncpro.repository.ClinicScheduleRepository;
import com.example.medisyncpro.repository.DoctorRepository;
import com.example.medisyncpro.repository.SettingsRepository;
import com.example.medisyncpro.service.ClinicScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ClinicScheduleServiceImpl implements ClinicScheduleService {


    private final ClinicScheduleRepository clinicScheduleRepository;
    private final SettingsRepository settingsRepository;
    private final ClinicScheduleMapper scheduleMapper;
    private final DoctorRepository doctorRepository;

    @Override
    public ClinicSchedule getById(Long id) {
        return clinicScheduleRepository.findById(id).orElse(null);
    }

    @Override
    public List<ClinicSchedule> getAll() {
        return clinicScheduleRepository.findAll();
    }

    private Comparable getFieldValue(
            GroupedClinicSchedule booking, String field) {
        if (field.equals("startDate")) {
            return booking.getDate();
        }
        throw new IllegalArgumentException("Invalid field for sorting: " + field);
    }

    @Override
    public ClinicSchedule save(CreateClinicSchedulesDto clinicSchedule) {
        return clinicScheduleRepository.save(scheduleMapper.createClinicSchedule(clinicSchedule));
    }

    @Override
    public ClinicSchedule update(ClinicSchedule clinicSchedule) {
        ClinicSchedule old = this.getById(clinicSchedule.getScheduleId());
        return clinicScheduleRepository.save(scheduleMapper.updateClinicSchedule(old, clinicSchedule));
    }

    @Override
    public void delete(Long id) {
        clinicScheduleRepository.deleteById(id);
    }

    public List<ClinicSchedule> generateSchedules(Long settingsId) {
        System.out.println("ITS HERE");
        List<ClinicSchedule> schedules = new ArrayList<>();
        Settings settings = settingsRepository.getById(settingsId);
        System.out.println(settings);
        LocalDate currentDate = LocalDate.now();

        for (int i = 0; i < settings.getDaysToGenerate(); i++) {
            LocalDateTime currentDateTime = LocalDateTime.of(currentDate, settings.getMorningStartTime());

            while (currentDateTime.isBefore(LocalDateTime.of(currentDate, settings.getMorningEndTime()))) {
                for (Doctor doctor : settings.getMorningDoctors()) {
                    ClinicSchedule schedule = ClinicScheduleMapper.mapToClinicSchedule(doctor, currentDate, currentDateTime, settings.getAppointmentDurationMinutes());

                    schedules.add(schedule);
                }
                currentDateTime = currentDateTime.plusMinutes(settings.getAppointmentDurationMinutes());
            }

            currentDateTime = LocalDateTime.of(currentDate, settings.getAfternoonStartTime());

            while (currentDateTime.isBefore(LocalDateTime.of(currentDate, settings.getAfternoonEndTime()))) {
                for (Doctor doctor : settings.getAfternoonDoctors()) {
                    ClinicSchedule schedule = ClinicScheduleMapper.mapToClinicSchedule(doctor, currentDate, currentDateTime, settings.getAppointmentDurationMinutes());
                    schedules.add(schedule);
                }
                currentDateTime = currentDateTime.plusMinutes(settings.getAppointmentDurationMinutes());
            }

            currentDate = currentDate.plusDays(1);
        }
        //this.clinicScheduleRepository.saveAll(schedules);
        return schedules;
    }


    @Override
    public ClinicScheduleResultDto getAllByClinicGroupedByDate(Long clinicId, PageRequest pageable, String sort) {

        System.out.println("==============SORT============");
        System.out.println(sort);
        List<ClinicSchedule> schedules = clinicScheduleRepository.findAllByClinicId(clinicId);

        List<ClinicScheduleDto> schedulesDto = schedules.stream()
                .map(schedule -> {
                    Doctor doctor = doctorRepository.getById(schedule.getDoctorId());
                    return scheduleMapper.clinicScheduleToDto(schedule, doctor.getDoctorName());
                }).toList();

        Map<Date, List<ClinicScheduleDto>> groupedSchedules = schedulesDto.stream()
                .collect(Collectors.groupingBy(ClinicScheduleDto::getDate));

        List<GroupedClinicSchedule> groupedClinicSchedules = groupedSchedules.entrySet().stream()
                .map(entry -> new GroupedClinicSchedule(entry.getKey(), entry.getValue()))
                .sorted((a, b) -> {
                    String[] sortBy = sort.split("-");
                    String field = sortBy[0];
                    String direction = sortBy[1];
                    Comparable fieldA = getFieldValue(a, field);
                    Comparable fieldB = getFieldValue(b, field);

                    return direction.equals("asc") ? fieldA.compareTo(fieldB) : fieldB.compareTo(fieldA);
                })
                .skip(pageable.getOffset()).limit(pageable.getPageSize()).toList();

        return new ClinicScheduleResultDto(groupedClinicSchedules, groupedClinicSchedules.size());

    }
}

