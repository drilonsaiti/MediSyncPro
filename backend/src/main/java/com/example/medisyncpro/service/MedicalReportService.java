package com.example.medisyncpro.service;

import com.example.medisyncpro.model.MedicalReport;
import com.example.medisyncpro.model.dto.CreateMedicalReportDto;
import com.example.medisyncpro.model.dto.MedicalReportDto;
import com.example.medisyncpro.model.dto.MedicalReportResultDto;
import org.springframework.data.domain.PageRequest;

public interface MedicalReportService {

    MedicalReportDto getById(Long id);

    MedicalReportResultDto getAll(PageRequest page, String nameOrEmail, String byDate);

    MedicalReport save(CreateMedicalReportDto medicalReport);

    MedicalReport update(MedicalReport medicalReport);

    void delete(Long id);
}
