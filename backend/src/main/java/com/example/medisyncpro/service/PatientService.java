package com.example.medisyncpro.service;

import com.example.medisyncpro.model.dto.CreatePatientDto;
import com.example.medisyncpro.model.Patient;

import java.util.List;

public interface PatientService {

    Patient getById(Long id);

    List<Patient> getAll();

    Patient save(CreatePatientDto patient) throws Exception;
    Patient update(Patient patient);

    void delete(Long id);
}
