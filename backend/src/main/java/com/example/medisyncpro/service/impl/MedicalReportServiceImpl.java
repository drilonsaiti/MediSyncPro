package com.example.medisyncpro.service.impl;

import com.example.medisyncpro.model.*;
import com.example.medisyncpro.model.dto.CreateMedicalReportDto;
import com.example.medisyncpro.model.dto.MedicalReportDto;
import com.example.medisyncpro.model.dto.MedicalReportResultDto;
import com.example.medisyncpro.model.dto.ServiceDto;
import com.example.medisyncpro.model.excp.MedicalReportException;
import com.example.medisyncpro.model.mapper.MedicalReportMapper;
import com.example.medisyncpro.repository.*;
import com.example.medisyncpro.service.MedicalReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

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
        if (id == null) {
            return null;
        }
        return medicalReportRepository.findById(id)
                .map(report -> {
                    Patient patient = patientRepository.getById(report.getPatientId());
                    Appointment appointment = appointmentRepository.findByDateAndPatientId(report.getAppointmentDate(), patient.getPatientId());
                    AtomicInteger totalPrice = new AtomicInteger();
                    List<ServiceDto> services = appointment.getServiceIds().stream()
                            .map(service -> {
                                ClinicServices s = serviceRepository.getById(service);
                                totalPrice.addAndGet(s.getPrice().intValue());
                                return new ServiceDto(s.getServiceName(), s.getDurationMinutes(), s.getPrice());
                            }).collect(Collectors.toList());
                    return reportMapper.getMedicalReport(report, patient.getPatientId(), patient.getPatientName(), patient.getEmail(), services, totalPrice.get());

                })
                .orElse(null);
    }

    @Override
    public MedicalReportResultDto getAll(PageRequest page, String nameOrEmail, String byDate) {
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("EEE MMM dd yyyy HH:mm:ss 'GMT'Z (zzzz)");
            LocalDateTime dateTime = !byDate.equals("all") ? LocalDateTime.parse(byDate, formatter) : LocalDateTime.now();

            List<MedicalReportDto> reports = medicalReportRepository.findAll().stream()
                    .filter(report -> {
                        try {
                            Patient p = patientRepository.getById(report.getPatientId());
                            return (((nameOrEmail.equals("all") || p.getPatientName().toLowerCase().contains(nameOrEmail.toLowerCase()) || p.getEmail().toLowerCase().contains(nameOrEmail.toLowerCase())))
                                    && (byDate.equals("all") || (
                                    !dateTime.toLocalTime().isAfter(LocalTime.of(0, 0)) ?
                                            report.getAppointmentDate().toLocalDate().isEqual(dateTime.toLocalDate()) :
                                            report.getAppointmentDate().isEqual(dateTime)
                            )));
                        } catch (Exception e) {
                            throw new MedicalReportException("Error filtering medical reports", e);
                        }
                    })
                    .map(report -> {
                        try {
                            Patient patient = patientRepository.getById(report.getPatientId());
                            Appointment appointment = appointmentRepository.findByDateAndPatientId(report.getAppointmentDate(), patient.getPatientId());
                            AtomicInteger totalPrice = new AtomicInteger();
                            List<ServiceDto> services = appointment.getServiceIds().stream()
                                    .map(service -> {
                                        ClinicServices s = serviceRepository.getById(service);
                                        totalPrice.addAndGet(s.getPrice().intValue());
                                        return new ServiceDto(s.getServiceName(), s.getDurationMinutes(), s.getPrice());
                                    }).collect(Collectors.toList());
                            return reportMapper.getMedicalReport(report, patient.getPatientId(), patient.getPatientName(), patient.getEmail(), services, totalPrice.get());
                        } catch (Exception e) {
                            throw new MedicalReportException("Error mapping medical reports", e);
                        }
                    }).collect(Collectors.toList());

            return new MedicalReportResultDto(
                    reports.stream()
                            .skip(page.getOffset())
                            .limit(page.getPageSize()).collect(Collectors.toList()), reports.size()
            );
        } catch (Exception e) {
            throw new MedicalReportException("Error retrieving medical reports", e);
        }
    }

    @Override
    public MedicalReport save(CreateMedicalReportDto medicalReport) {
        return doctorRepository.findById(1L)
                .map(doctor -> {
                    try {
                        Appointment appointment = appointmentRepository.getById(medicalReport.getAppointmentId());
                        return medicalReportRepository.save(reportMapper.createMedicalReport(medicalReport, doctor, appointment.getDate()));
                    } catch (Exception e) {
                        throw new MedicalReportException("Error saving medical report", e);
                    }
                })
                .orElseThrow(() -> new MedicalReportException("Doctor with id 1 not found"));
    }

    @Override
    public MedicalReport update(MedicalReport medicalReport) {
        return medicalReportRepository.findById(medicalReport.getReportId())
                .map(old -> {
                    try {
                        return medicalReportRepository.save(reportMapper.updateMedicalReport(old, medicalReport));
                    } catch (Exception e) {
                        throw new MedicalReportException("Error updating medical report", e);
                    }
                })
                .orElseThrow(() -> new MedicalReportException("Medical report with id " + medicalReport.getReportId() + " not found"));
    }

    @Override
    public void delete(Long id) {
        try {
            medicalReportRepository.deleteById(id);
        } catch (Exception e) {
            throw new MedicalReportException("Error deleting medical report", e);
        }
    }
}
