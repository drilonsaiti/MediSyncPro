package com.example.medisyncpro.service.impl;

import com.example.medisyncpro.model.dto.CreateDoctorDto;
import com.example.medisyncpro.model.mapper.DoctorMapper;
import com.example.medisyncpro.model.Clinic;
import com.example.medisyncpro.model.Doctor;
import com.example.medisyncpro.model.Specializations;
import com.example.medisyncpro.repository.ClinicRepository;
import com.example.medisyncpro.repository.DoctorRepository;
import com.example.medisyncpro.repository.SpecializationRepository;
import com.example.medisyncpro.service.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
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
    public List<Doctor> getAll() {
        return doctorRepository.findAll();
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

