package com.example.medisyncpro.service;

import com.example.medisyncpro.dto.CreatePatientDto;
import com.example.medisyncpro.model.Patient;

import java.util.List;

public interface PatientService {

    Patient getById(Long id);

    List<Patient> getAll();

    Patient save(CreatePatientDto patient);
    Patient update(Patient patient);

    void delete(Long id);
}
