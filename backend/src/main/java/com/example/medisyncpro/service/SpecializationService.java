package com.example.medisyncpro.service;

import com.example.medisyncpro.model.Specializations;

import java.util.List;

public interface SpecializationService {

    Specializations getById(Long id);

    List<Specializations> getAll();

    Specializations save(Specializations specializations);

    void delete(Long id);
}
