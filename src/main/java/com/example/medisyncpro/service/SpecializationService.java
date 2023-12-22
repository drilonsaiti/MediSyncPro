package com.example.medisyncpro.service;

import com.example.medisyncpro.model.Specialization;

import java.util.List;

public interface SpecializationService {

    Specialization getById(Long id);

    List<Specialization> getAll();

    Specialization save(Specialization specialization);

    void delete(Long id);
}
