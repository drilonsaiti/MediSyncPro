package com.example.medisyncpro.service.impl;

import com.example.medisyncpro.model.*;
import com.example.medisyncpro.model.dto.CreateMedicalReportDto;
import com.example.medisyncpro.model.dto.MedicalReportDto;
import com.example.medisyncpro.model.dto.ServiceDto;
import com.example.medisyncpro.model.mapper.MedicalReportMapper;
import com.example.medisyncpro.repository.*;
import com.example.medisyncpro.service.MedicalReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MedicalReportServiceImpl implements MedicalReportService {


    private final MedicalReportRepository medicalReportRepository;
    private final DoctorRepository doctorRepository;
    private final MedicalReportMapper reportMapper;
    private final PatientRepository patientRepository;
    private final AppointmentRepository appointmentRepository;
    private final ServiceRepository serviceRepository;

    @Override
    public MedicalReportDto getById(Long id) {
        MedicalReport report =  medicalReportRepository.findById(id).orElse(null);
        Patient patient = patientRepository.getById(report.getPatientId());
        Appointment appointment = this.appointmentRepository.findByDateAndPatientId(report.getAppointmentDate(), patient.getPatientId());
        BigDecimal totalPrice = new BigDecimal(0);
        List<ServiceDto> services = appointment.getServiceIds().stream().map(service ->{
            ClinicServices s = this.serviceRepository.getById(service);
            totalPrice.add(s.getPrice());
            return new ServiceDto(s.getServiceName(),s.getDurationMinutes(),s.getPrice());
        }).toList();

        return reportMapper.getMedicalReport(report,patient.getPatientId(), patient.getPatientName(), patient.getEmail(),services,totalPrice);

    }

    @Override
    public List<MedicalReportDto> getAll() {
        return medicalReportRepository.findAll().stream().map(report -> {
            Patient patient = patientRepository.getById(report.getPatientId());
            System.out.println(report.getAppointmentDate());
            System.out.println(patient.getPatientId());
            Appointment appointment = this.appointmentRepository.findByDateAndPatientId(report.getAppointmentDate(), patient.getPatientId());
            BigDecimal totalPrice = new BigDecimal(0);
            List<ServiceDto> services = appointment.getServiceIds().stream().map(service ->{
                ClinicServices s = this.serviceRepository.getById(service);
                totalPrice.add(s.getPrice());
                return new ServiceDto(s.getServiceName(),s.getDurationMinutes(),s.getPrice());
            }).toList();
            return reportMapper.getMedicalReport(report,patient.getPatientId(), patient.getPatientName(), patient.getEmail(),services,totalPrice);
        }).toList();
    }

    @Override
    public MedicalReport save(CreateMedicalReportDto medicalReport) {
        Doctor doctor = doctorRepository.getById(1L);
        Appointment appointment = appointmentRepository.getById(medicalReport.getAppointmentId());
        return medicalReportRepository.save(reportMapper.createMedicalReport(medicalReport,doctor,appointment.getDate()));
    }

    @Override
    public MedicalReport update(MedicalReport medicalReport) {
        MedicalReport old = this.medicalReportRepository.getById(medicalReport.getReportId());
        return medicalReportRepository.save(reportMapper.updateMedicalReport(old,medicalReport));
    }

    @Override
    public void delete(Long id) {
        medicalReportRepository.deleteById(id);
    }
}

