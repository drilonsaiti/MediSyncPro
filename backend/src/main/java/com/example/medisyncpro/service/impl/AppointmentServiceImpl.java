package com.example.medisyncpro.service.impl;

import com.example.medisyncpro.model.*;
import com.example.medisyncpro.model.dto.*;
import com.example.medisyncpro.model.excp.ClinicAppointmentException;
import com.example.medisyncpro.model.mapper.AppointmentMapper;
import com.example.medisyncpro.repository.*;
import com.example.medisyncpro.service.AppointmentService;
import com.example.medisyncpro.service.MedicalReportService;
import com.example.medisyncpro.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {


    private final AppointmentRepository appointmentRepository;
    private final AppointmentMapper appointmentMapper;
    private final ServiceRepository serviceRepository;
    private final ClinicScheduleRepository clinicScheduleRepository;
    private final PatientService patientService;
    private final DoctorRepository doctorRepository;
    private final MedicalReportRepository reportRepository;
    private final MedicalReportService medicalReportService;
    private final ClinicRepository clinicRepository;
    private final PatientRepository patientRepository;

    @Override
    public Appointment getById(Long id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new ClinicAppointmentException("Appointment with ID " + id + " not found"));
    }

    @Override
    public AppointmentResultDto getAll(PageRequest pageable, String nameOrEmail,String types) throws ClinicAppointmentException {

            List<AppointmentDto> appointment = appointmentRepository.findAll().stream()
                    .filter(a -> {
                        Patient p = this.patientService.getById(a.getPatientId());
                        return ((nameOrEmail.equals("all") || p.getPatientName().toLowerCase().contains(nameOrEmail.toLowerCase())
                                || p.getEmail().toLowerCase().contains(nameOrEmail.toLowerCase())));
                    })
                    .filter(a -> types.equals("all") ||
                            a.getDate().toLocalDate().isEqual(LocalDate.now()))
                    .map(appm -> {
                        Optional<Patient> patient = Optional.ofNullable(patientRepository.findById(appm.getPatientId()).orElse(null));
                        Optional<Clinic> clinic = Optional.ofNullable(clinicRepository.findByClinicId(appm.getClinicId()).orElse(null));
                        Optional<Doctor> doctor = Optional.ofNullable(this.doctorRepository.findByDoctorId(appm.getDoctorId()).orElse(null));
                        MedicalReport report = this.reportRepository.findByAppointmentId(appm.getAppointmentId()).orElse(null);
                        MedicalReportDto reportDto = medicalReportService.getById(report != null ? report.getReportId() : null);
                        List<String> services = appm.getServiceIds().stream().map(service -> {
                            Optional<ClinicServices> s = this.serviceRepository.findByServiceId(service);
                            return s.isPresent() ? s.get().getServiceName() : null;
                        }).filter(Objects::nonNull).toList();
                        return appointmentMapper.getAppointment(appm, patient.get(), doctor.get(), services, reportDto,clinic.get().getClinicName());
                    }).toList();

            return new AppointmentResultDto(appointment.stream()
                    .skip(pageable.getOffset())
                    .limit(pageable.getPageSize()).toList(), appointment.size());

    }

    @Override
    public List<AppointmentDto> getAllByPatient(Long id) throws ClinicAppointmentException {
        try {
            return appointmentRepository.findAllByPatientId(id).stream().map(appm -> {
                try {
                    Patient patient = patientService.getById(appm.getPatientId());
                    Doctor doctor = this.doctorRepository.getById(appm.getDoctorId());
                    Optional<Clinic> clinic = clinicRepository.findByClinicId(appm.getClinicId());

                    MedicalReport report = this.reportRepository.findByAppointmentId(appm.getAppointmentId()).orElse(null);
                    MedicalReportDto reportDto = report != null ? medicalReportService.getById(report.getReportId()) : null;
                    List<String> services = appm.getServiceIds().stream().map(serviceId -> {
                        ClinicServices s = this.serviceRepository.getById(serviceId);
                        return s != null ? s.getServiceName() : null;
                    }).filter(Objects::nonNull).toList();
                    return appointmentMapper.getAppointment(appm, patient, doctor, services, reportDto,clinic.get().getClinicName());
                } catch (Exception e) {
                    // Log or handle the exception
                    return null; // Skip this appointment if an exception occurs
                }
            }).filter(Objects::nonNull).toList(); // Filter out null appointment DTOs
        } catch (Exception e) {
            throw new ClinicAppointmentException("Failed to retrieve appointments by patient ID " + id, e);
        }
    }

    @Override
    public List<AppointmentDto> getAllByDoctor(Long id) throws ClinicAppointmentException {
        try {
            return appointmentRepository.findAllByDoctorId(id).stream().map(appm -> {
                Patient patient = patientService.getById(appm.getPatientId());
                Doctor doctor = this.doctorRepository.getById(appm.getDoctorId());
                MedicalReport report = this.reportRepository.findByAppointmentId(appm.getAppointmentId()).orElse(null);
                MedicalReportDto reportDto = medicalReportService.getById(report.getReportId());
                Optional<Clinic> clinic = clinicRepository.findByClinicId(appm.getClinicId());

                List<String> services = appm.getServiceIds().stream().map(service -> {
                    ClinicServices s = this.serviceRepository.getById(service);
                    return s.getServiceName();
                }).toList();
                return appointmentMapper.getAppointment(appm, patient, doctor, services, reportDto,clinic.get().getClinicName());
            }).toList();
        } catch (Exception e) {
            throw new ClinicAppointmentException("Failed to retrieve appointments by doctor ID " + id, e);
        }
    }

    @Override
    public Appointment save(CreateAppointmentDto appointment) {
        try {
            return appointmentRepository.save(appointmentMapper.createAppointment(appointment));
        } catch (DataAccessException e) {
            throw new ClinicAppointmentException("Failed to save appointment: " + e.getMessage(), e);
        }
    }

    @Override
    public Appointment update(AppointmentDto appointment) throws ClinicAppointmentException {
        try {
            Appointment old = this.getById(appointment.getAppointmentId());
            UpdatePatientDto patient = new UpdatePatientDto(appointment.getPatientId(), appointment.getPatientName(), appointment.getGender(), appointment.getAddress(), appointment.getContactNumber(), appointment.getEmail(), appointment.getBirthDay());
            patientService.update(patient);
            return appointmentRepository.save(appointmentMapper.updateAppointment(old, appointment));
        } catch (Exception e) {
            throw new ClinicAppointmentException("Failed to update appointment: " + e.getMessage(), e);
        }
    }

    @Override
    public void delete(Long id) throws ClinicAppointmentException {
        try {
            appointmentRepository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw new ClinicAppointmentException("Appointment with ID " + id + " not found", e);
        } catch (Exception e) {
            throw new ClinicAppointmentException("Failed to delete appointment with ID " + id, e);
        }
    }

    @Override
    public List<AppointmentDateDto> getAppointmentDates() throws ClinicAppointmentException {
        try {
            List<ClinicSchedule> clinicSchedules = clinicScheduleRepository.findAll().stream().filter(cs -> cs.getClinicId() == 1L).toList();
            return this.appointmentRepository.findAll()
                    .stream()
                    .map(appm -> {
                        boolean isBookedForEntireDay = clinicSchedules.stream()
                                .filter(cs -> cs.getStartTime().toLocalDate().isEqual(appm.getDate().toLocalDate()))
                                .allMatch(ClinicSchedule::getIsBooked);

                        return isBookedForEntireDay ? new AppointmentDateDto(appm.getDate()) : null;
                    })
                    .filter(Objects::nonNull)
                    .toList();
        } catch (Exception e) {
            throw new ClinicAppointmentException("Failed to retrieve appointment dates", e);
        }
    }

    @Override
    public Appointment createAppointmentByReceptionist(AppointmentByReceptionistDto dto) throws ClinicAppointmentException {
        try {
            CreatePatientDto createPatientDto = new CreatePatientDto(dto.getPatientName(), dto.getGender(), dto.getAddress(), dto.getContactNumber(), dto.getEmail(), dto.getBirthDay());
            Patient patient = patientService.save(createPatientDto);
            ClinicSchedule clinicSchedule = clinicScheduleRepository.findClinicScheduleByClinicIdAndStartTime(dto.getClinicId(), dto.getAppointment());

            CreateAppointmentDto createAppointmentDto = new CreateAppointmentDto(patient.getPatientId(), 1L, dto.getClinicId(), dto.getAppointment(), dto.getServiceId());
            clinicSchedule.setIsBooked(true);
            clinicScheduleRepository.save(clinicSchedule);
            return this.save(createAppointmentDto);
        } catch (Exception e) {
            throw new ClinicAppointmentException("Failed to create appointment", e);
        }
    }

    @Override
    public void changeAttended(Long id, boolean attended) throws ClinicAppointmentException {
        try {
            Appointment appointment = this.getById(id);
            appointment.setAttended(attended);
            appointmentRepository.save(appointment);
        } catch (Exception e) {
            throw new ClinicAppointmentException("Failed to change attended status for appointment with ID " + id, e);
        }
    }

    @Override
    public AppointmentDto nexAppointment(Long id) {
        return this.appointmentRepository.findAllByPatientId(id)
                .stream().filter(appointment -> !appointment.isAttended())
                .filter(appointment -> appointment.getDate().toLocalDate().isAfter(LocalDate.now())) // Filter appointments after today
                .min(Comparator.comparing(Appointment::getDate))
                .map(appm -> {
                    Patient patient = patientService.getById(appm.getPatientId());
                    Doctor doctor = this.doctorRepository.getById(appm.getDoctorId());
                    Optional<Clinic> clinic = clinicRepository.findByClinicId(appm.getClinicId());

                    List<String> services = appm.getServiceIds().stream().map(service -> {
                        ClinicServices s = this.serviceRepository.getById(service);
                        return s.getServiceName();
                    }).toList();
                    return appointmentMapper.getAppointment(appm, patient, doctor, services, null,clinic.get().getClinicName());
                }).orElseThrow(() -> new ClinicAppointmentException("Doesn't have any next appointment"));

    }
}
