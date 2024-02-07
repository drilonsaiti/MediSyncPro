package com.example.medisyncpro.service;

import com.example.medisyncpro.model.Doctor;
import com.example.medisyncpro.model.dto.AddDoctorToClinicDto;
import com.example.medisyncpro.model.dto.CreateDoctorDto;
import com.example.medisyncpro.model.dto.DoctorResultDto;
import com.example.medisyncpro.model.dto.SearchDoctorDto;
import org.springframework.data.domain.PageRequest;

import java.util.List;

public interface DoctorService {

    Doctor getById(Long id);

    DoctorResultDto getAll(PageRequest pageable, String specializations, String service);

    DoctorResultDto getAllByClinicId(Long clinicId,PageRequest pageable, String specializations, String service);

    List<SearchDoctorDto> getAllDoctors(Long clinicId);
    Doctor save(CreateDoctorDto doctor);

    void addDoctorToClinic(List<AddDoctorToClinicDto> dto,Long clinicId);

    Doctor update(Doctor doctor);

    void delete(Long id);

    void deleteDoctorFromClinic(Long id, Long clinicId);
}

