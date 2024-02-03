package com.example.medisyncpro.service.impl;

import com.example.medisyncpro.model.Clinic;
import com.example.medisyncpro.model.ClinicSchedule;
import com.example.medisyncpro.model.ClinicServices;
import com.example.medisyncpro.model.Settings;
import com.example.medisyncpro.model.dto.ClinicDto;
import com.example.medisyncpro.model.dto.ClinicResultDto;
import com.example.medisyncpro.model.mapper.ClinicMapper;
import com.example.medisyncpro.repository.ClinicRepository;
import com.example.medisyncpro.repository.ClinicScheduleRepository;
import com.example.medisyncpro.repository.ServiceRepository;
import com.example.medisyncpro.repository.SettingsRepository;
import com.example.medisyncpro.service.ClinicService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ClinicServiceImpl implements ClinicService {


    private final ClinicRepository clinicRepository;
    private final SettingsRepository settingsRepository;
    private final ClinicMapper clinicMapper;
    private final ServiceRepository serviceRepository;
    private final ClinicScheduleRepository scheduleRepository;

    @Override
    public Clinic getById(Long id) {
        return clinicRepository.findById(id).orElse(null);
    }

    @Override
    public ClinicDto getByIdDto(Long id) {
        Clinic clinic = this.getById(id);
        Settings settings = settingsRepository.getById(clinic.getSettingsId());
        return clinicMapper.getClinicDto(clinic,settings);
    }
    @Override
    public ClinicResultDto getAll(PageRequest pageable, String specializations, String service, String byDate) {

        String [] specs = specializations.split(",");
        String [] services = service.split(",");
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("EEE MMM dd yyyy HH:mm:ss 'GMT'Z (zzzz)");

        LocalDateTime dateTime = !byDate.equals("all") ? LocalDateTime.parse(byDate,formatter) : LocalDateTime.now();

        List<ClinicDto> clinics =  clinicRepository.findAll()
                .stream()
                .filter(clinic ->
                        (specializations.equals("all") || clinic.getSpecializations()
                                .stream().anyMatch(specialization ->
                                        Arrays.asList(specs).contains(specialization.getSpecializationName())))
                                &&
                                (service.equals("all") || clinic.getServices()
                                        .stream()
                                        .anyMatch(srv -> Arrays.asList(services).contains(srv.getServiceName())))
                        && (byDate.equals("all") || scheduleRepository.findAllByClinicId(clinic.getClinicId()).stream().anyMatch(
                                schedule ->
                                        !dateTime.toLocalTime().isAfter(LocalTime.of(0, 0)) ?
                                                (schedule.getStartTime().toLocalDate().isEqual(dateTime.toLocalDate()) && !schedule.getIsBooked()) :
                                                (schedule.getStartTime().isEqual(dateTime) && !schedule.getIsBooked())


                        ))
                )
                .map(clinic -> clinicMapper
                        .getClinicDto(clinic, settingsRepository.getById(clinic.getClinicId()))).toList();

        int totalElements = clinics.size();

        return new ClinicResultDto(clinics
                .stream()
                .skip(pageable.getOffset())
                .limit(pageable.getPageSize()).toList(),totalElements
        );
    }

    @Override
    public Clinic save(Clinic clinic) {
        return clinicRepository.save(clinic);
    }

    @Override
    public void delete(Long id) {
        clinicRepository.deleteById(id);
    }

    @Override
    public long getTotalClinicCount(String specialization, String status) {
        return 0;
    }

    @Override
    public List<ClinicServices> getClinicServicesById(Long id) {
        List<ClinicServices> services = this.getById(id).getServices();
        System.out.println("===========SERVICES=============");
        System.out.println(services);
        return services;
    }
}

