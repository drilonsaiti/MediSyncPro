package com.example.medisyncpro.service;

import com.example.medisyncpro.model.MedicalReport;

import java.util.List;

public interface MedicalReportService {

    MedicalReport getById(Long id);

    List<MedicalReport> getAll();

    MedicalReport save(MedicalReport medicalReport);

    void delete(Long id);
}
