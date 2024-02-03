package com.example.medisyncpro.service.impl;

import com.example.medisyncpro.model.dto.ClinicDto;
import com.example.medisyncpro.model.dto.ClinicResultDto;
import com.example.medisyncpro.model.dto.CreateDoctorDto;
import com.example.medisyncpro.model.dto.DoctorResultDto;
import com.example.medisyncpro.model.mapper.DoctorMapper;
import com.example.medisyncpro.model.Clinic;
import com.example.medisyncpro.model.Doctor;
import com.example.medisyncpro.model.Specializations;
import com.example.medisyncpro.repository.ClinicRepository;
import com.example.medisyncpro.repository.DoctorRepository;
import com.example.medisyncpro.repository.SpecializationRepository;
import com.example.medisyncpro.service.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DoctorServiceImpl implements DoctorService {


    private final DoctorRepository doctorRepository;
    private final SpecializationRepository specializationRepository;
    private final ClinicRepository clinicRepository;
    private final DoctorMapper doctorMapper;

    @Override
    public Doctor getById(Long id) {
        return doctorRepository.findById(id).orElse(null);
    }

    @Override
    public DoctorResultDto getAll(PageRequest pageable, String specializations, String service) {
        String [] specs = specializations.split(",");
        String [] services = service.split(",");

        List<Doctor> doctors =  doctorRepository.findAll()
                .stream()
                .filter(doctor ->
                        (specializations.equals("all") || Arrays.asList(specs).contains(doctor.getSpecialization().getSpecializationName()))

                ).toList();

        int totalElements = doctors.size();
        System.out.println("=====TOTAL ELEMENTS=======");
        System.out.println(totalElements);
        return new DoctorResultDto(doctors
                .stream()
                .skip(pageable.getOffset())
                .limit(pageable.getPageSize()).toList(),totalElements
        );
    }

    @Override
    public Doctor save(CreateDoctorDto doctor) {
        Specializations specializations = specializationRepository.getById(doctor.getSpecializationId());
        Clinic clinic = clinicRepository.getById(doctor.getClinicId());
        return doctorRepository.save(doctorMapper.createDoctor(doctor,specializations,clinic));
    }

    @Override
    public Doctor update(Doctor doctor) {
        Doctor old = this.getById(doctor.getDoctorId());
        return doctorRepository.save(doctorMapper.updateDoctor(old,doctor));
    }

    @Override
    public void delete(Long id) {
        doctorRepository.deleteById(id);
    }
}

