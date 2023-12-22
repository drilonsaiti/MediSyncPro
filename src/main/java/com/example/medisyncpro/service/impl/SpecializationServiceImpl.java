package com.example.medisyncpro.service.impl;

import com.example.medisyncpro.model.Specialization;
import com.example.medisyncpro.repository.SpecializationRepository;
import com.example.medisyncpro.service.SpecializationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SpecializationServiceImpl implements SpecializationService {

    @Autowired
    private SpecializationRepository specializationRepository;

    @Override
    public Specialization getById(Long id) {
        return specializationRepository.findById(id).orElse(null);
    }

    @Override
    public List<Specialization> getAll() {
        return specializationRepository.findAll();
    }

    @Override
    public Specialization save(Specialization specialization) {
        return specializationRepository.save(specialization);
    }

    @Override
    public void delete(Long id) {
        specializationRepository.deleteById(id);
    }
}
