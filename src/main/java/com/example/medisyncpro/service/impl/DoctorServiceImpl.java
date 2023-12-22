package com.example.medisyncpro.service.impl;

import com.example.medisyncpro.model.Doctor;
import com.example.medisyncpro.repository.DoctorRepository;
import com.example.medisyncpro.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DoctorServiceImpl implements DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Override
    public Doctor getById(Long id) {
        return doctorRepository.findById(id).orElse(null);
    }

    @Override
    public List<Doctor> getAll() {
        return doctorRepository.findAll();
    }

    @Override
    public Doctor save(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    @Override
    public void delete(Long id) {
        doctorRepository.deleteById(id);
    }
}

