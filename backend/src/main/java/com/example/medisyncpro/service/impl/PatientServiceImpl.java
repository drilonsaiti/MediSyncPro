package com.example.medisyncpro.service.impl;

import com.example.medisyncpro.dto.CreatePatientDto;
import com.example.medisyncpro.mapper.PatientMapper;
import com.example.medisyncpro.model.Patient;
import com.example.medisyncpro.repository.PatientRepository;
import com.example.medisyncpro.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PatientServiceImpl implements PatientService {



    private final PatientRepository patientRepository;
    private final PatientMapper patientMapper;

    @Override
    public Patient getById(Long id) {
        return patientRepository.findById(id).orElse(null);
    }

    @Override
    public List<Patient> getAll() {
        return patientRepository.findAll();
    }

    @Override
    public Patient save(CreatePatientDto patient) {
        return patientRepository.save(patientMapper.createPatient(patient));
    }

    @Override
    public Patient update(Patient patient) {
        Patient p = this.getById(patient.getPatientId());

        return patientRepository.save(patientMapper.updatePatient(p,patient));
    }

    @Override
    public void delete(Long id) {
        patientRepository.deleteById(id);
    }
}

