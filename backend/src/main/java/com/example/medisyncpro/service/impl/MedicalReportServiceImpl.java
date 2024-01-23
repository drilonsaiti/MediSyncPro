package com.example.medisyncpro.service.impl;

import com.example.medisyncpro.dto.CreateMedicalReportDto;
import com.example.medisyncpro.mapper.MedicalReportMapper;
import com.example.medisyncpro.model.Doctor;
import com.example.medisyncpro.model.MedicalReport;
import com.example.medisyncpro.repository.DoctorRepository;
import com.example.medisyncpro.repository.MedicalReportRepository;
import com.example.medisyncpro.service.MedicalReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MedicalReportServiceImpl implements MedicalReportService {


    private final MedicalReportRepository medicalReportRepository;
    private final DoctorRepository doctorRepository;
    private final MedicalReportMapper reportMapper;

    @Override
    public MedicalReport getById(Long id) {
        return medicalReportRepository.findById(id).orElse(null);
    }

    @Override
    public List<MedicalReport> getAll() {
        System.out.println("ITS HERE IMPL");
        System.out.println(medicalReportRepository.findAll());
        return medicalReportRepository.findAll();
    }

    @Override
    public MedicalReport save(CreateMedicalReportDto medicalReport) {
        Doctor doctor = doctorRepository.getById(medicalReport.getDoctorId());
        return medicalReportRepository.save(reportMapper.createMedicalReport(medicalReport,doctor));
    }

    @Override
    public MedicalReport update(MedicalReport medicalReport) {
        MedicalReport old = this.getById(medicalReport.getReportId());
        return medicalReportRepository.save(reportMapper.updateMedicalReport(old,medicalReport));
    }

    @Override
    public void delete(Long id) {
        medicalReportRepository.deleteById(id);
    }
}

