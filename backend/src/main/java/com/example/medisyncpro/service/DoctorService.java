package com.example.medisyncpro.service;

import com.example.medisyncpro.dto.CreateDoctorDto;
import com.example.medisyncpro.model.Doctor;

import java.util.List;

public interface DoctorService {

    Doctor getById(Long id);

    List<Doctor> getAll();

    Doctor save(CreateDoctorDto doctor);
    Doctor update(Doctor doctor);

    void delete(Long id);
}

