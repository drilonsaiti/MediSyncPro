package com.example.medisyncpro.service.impl;

import com.example.medisyncpro.model.*;
import com.example.medisyncpro.model.dto.CreateMedicalReportDto;
import com.example.medisyncpro.model.dto.MedicalReportDto;
import com.example.medisyncpro.model.dto.MedicalReportResultDto;
import com.example.medisyncpro.model.dto.ServiceDto;
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
        if(report != null) {
            Patient patient = patientRepository.getById(report.getPatientId());
            Appointment appointment = this.appointmentRepository.findByDateAndPatientId(report.getAppointmentDate(), patient.getPatientId());
            AtomicInteger totalPrice = new AtomicInteger();
            List<ServiceDto> services = appointment.getServiceIds().stream().map(service -> {
                ClinicServices s = this.serviceRepository.getById(service);
                totalPrice.addAndGet(s.getPrice().intValue());
                return new ServiceDto(s.getServiceName(), s.getDurationMinutes(), s.getPrice());
            }).toList();

            return reportMapper.getMedicalReport(report, patient.getPatientId(), patient.getPatientName(), patient.getEmail(), services, totalPrice.get());
        }
        return null;

    }

    @Override
    public MedicalReportResultDto getAll(PageRequest page, String nameOrEmail, String byDate) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("EEE MMM dd yyyy HH:mm:ss 'GMT'Z (zzzz)");

        LocalDateTime dateTime = !byDate.equals("all") ? LocalDateTime.parse(byDate,formatter) : LocalDateTime.now();

        System.out.println(dateTime);
        System.out.println(byDate);

        List<MedicalReportDto> reports = medicalReportRepository.findAll().stream()
                .filter(report -> {
                    Patient p = this.patientRepository.getById(report.getPatientId());
                    return (((nameOrEmail.equals("all") || p.getPatientName().toLowerCase().contains(nameOrEmail.toLowerCase())
                            || p.getEmail().toLowerCase().contains(nameOrEmail.toLowerCase())))
                            && (byDate.equals("all") || (
                            !dateTime.toLocalTime().isAfter(LocalTime.of(0, 0)) ?
                                    report.getAppointmentDate().toLocalDate().isEqual(dateTime.toLocalDate()) :
                    report.getAppointmentDate().isEqual(dateTime)
                    )

                            /*&& (byDate.equals("all") ||
                                    !dateTime.toLocalTime().isAfter(LocalTime.of(0, 0)) ?
                                            (report.getAppointmentDate().toLocalDate().isEqual(dateTime.toLocalDate()))  :
                                            (report.getAppointmentDate().isEqual(dateTime))*/
                    ));
                })
                .map(report -> {
            Patient patient = patientRepository.getById(report.getPatientId());
            Appointment appointment = this.appointmentRepository.findByDateAndPatientId(report.getAppointmentDate(), patient.getPatientId());
            AtomicInteger totalPrice = new AtomicInteger();
            List<ServiceDto> services = appointment.getServiceIds().stream().map(service ->{
                ClinicServices s = this.serviceRepository.getById(service);
                totalPrice.addAndGet( s.getPrice().intValue());
                return new ServiceDto(s.getServiceName(),s.getDurationMinutes(),s.getPrice());
            }).toList();
            return reportMapper.getMedicalReport(report,patient.getPatientId(), patient.getPatientName(), patient.getEmail(),services,totalPrice.get());
        }).toList();

        System.out.println(reports);
        int totalElements = reports.size();

        return new MedicalReportResultDto(
                reports.stream()
                .skip(page.getOffset())
                .limit(page.getPageSize()).toList(),totalElements
        );
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

