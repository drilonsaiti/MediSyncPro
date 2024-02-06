package com.example.medisyncpro.service;

import com.example.medisyncpro.model.Patient;
import com.example.medisyncpro.model.dto.CreatePatientDto;
import com.example.medisyncpro.model.dto.PatientResultDto;
import com.example.medisyncpro.model.dto.UpdatePatientDto;
import org.springframework.data.domain.PageRequest;

public interface PatientService {

    Patient getById(Long id);

    PatientResultDto getAll(PageRequest pageable, String nameOrEmail);

    Patient save(CreatePatientDto patient) throws Exception;

    Patient update(UpdatePatientDto patient);

    void delete(Long id);
}
