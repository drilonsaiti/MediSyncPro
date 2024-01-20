package com.example.medisyncpro.service.impl;

import com.example.medisyncpro.model.MedicalReport;
import com.example.medisyncpro.repository.MedicalReportRepository;
import com.example.medisyncpro.service.MedicalReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MedicalReportServiceImpl implements MedicalReportService {

    @Autowired
    private MedicalReportRepository medicalReportRepository;

    @Override
    public MedicalReport getById(Long id) {
        return medicalReportRepository.findById(id).orElse(null);
    }

    @Override
    public List<MedicalReport> getAll() {
        return medicalReportRepository.findAll();
    }

    @Override
    public MedicalReport save(MedicalReport medicalReport) {
        return medicalReportRepository.save(medicalReport);
    }

    @Override
    public void delete(Long id) {
        medicalReportRepository.deleteById(id);
    }
}

