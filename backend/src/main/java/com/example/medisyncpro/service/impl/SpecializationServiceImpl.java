package com.example.medisyncpro.service.impl;

import com.example.medisyncpro.model.Specializations;
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
    public Specializations getById(Long id) {
        return specializationRepository.findById(id).orElse(null);
    }

    @Override
    public List<Specializations> getAll() {
        return specializationRepository.findAll();
    }

    @Override
    public Specializations save(Specializations specializations) {
        return specializationRepository.save(specializations);
    }

    @Override
    public void delete(Long id) {
        specializationRepository.deleteById(id);
    }
}
