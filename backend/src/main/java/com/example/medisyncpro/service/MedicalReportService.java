package com.example.medisyncpro.service;

import com.example.medisyncpro.model.dto.CreateMedicalReportDto;
import com.example.medisyncpro.model.dto.MedicalReportDto;
import com.example.medisyncpro.model.MedicalReport;

import java.util.List;

public interface MedicalReportService {

    MedicalReportDto getById(Long id);

    List<MedicalReportDto> getAll();

    MedicalReport save(CreateMedicalReportDto medicalReport);
    MedicalReport update(MedicalReport medicalReport);

    void delete(Long id);
}
