package com.example.medisyncpro.service;

import com.example.medisyncpro.model.Clinic;

import java.util.List;

public interface ClinicService {

    Clinic getById(Long id);

    List<Clinic> getAll();

    Clinic save(Clinic clinic);

    void delete(Long id);
}

