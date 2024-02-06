package com.example.medisyncpro.service;

import com.example.medisyncpro.model.Doctor;
import com.example.medisyncpro.model.dto.CreateDoctorDto;
import com.example.medisyncpro.model.dto.DoctorResultDto;
import org.springframework.data.domain.PageRequest;

public interface DoctorService {

    Doctor getById(Long id);

    DoctorResultDto getAll(PageRequest pageable, String specializations, String service);


    Doctor save(CreateDoctorDto doctor);

    Doctor update(Doctor doctor);

    void delete(Long id);

    void deleteDoctorFromClinic(Long id, Long clinicId);
}

