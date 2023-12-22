package com.example.medisyncpro.service.impl;

import com.example.medisyncpro.model.Clinic;
import com.example.medisyncpro.repository.ClinicRepository;
import com.example.medisyncpro.service.ClinicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ClinicServiceImpl implements ClinicService {

    @Autowired
    private ClinicRepository clinicRepository;

    @Override
    public Clinic getById(Long id) {
        return clinicRepository.findById(id).orElse(null);
    }

    @Override
    public List<Clinic> getAll() {
        return clinicRepository.findAll();
    }

    @Override
    public Clinic save(Clinic clinic) {
        return clinicRepository.save(clinic);
    }

    @Override
    public void delete(Long id) {
        clinicRepository.deleteById(id);
    }
}

