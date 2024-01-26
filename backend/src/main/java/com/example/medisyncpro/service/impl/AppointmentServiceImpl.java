package com.example.medisyncpro.service.impl;

import com.example.medisyncpro.model.*;
import com.example.medisyncpro.model.dto.*;
import com.example.medisyncpro.model.mapper.AppointmentMapper;
import com.example.medisyncpro.repository.AppointmentRepository;
import com.example.medisyncpro.repository.ClinicScheduleRepository;
import com.example.medisyncpro.repository.DoctorRepository;
import com.example.medisyncpro.repository.ServiceRepository;
import com.example.medisyncpro.service.AppointmentService;
import com.example.medisyncpro.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {


    private final AppointmentRepository appointmentRepository;
    private final AppointmentMapper appointmentMapper;
    private final ServiceRepository serviceRepository;
    private final ClinicScheduleRepository clinicScheduleRepository;
    private final PatientService patientService;
    private final DoctorRepository doctorRepository;

    @Override
    public Appointment getById(Long id) {
        return appointmentRepository.findById(id).orElse(null);
    }

    @Override
    public List<AppointmentDto> getAll() {
        return appointmentRepository.findAll().stream().map(appm ->{
            Patient patient = patientService.getById(appm.getPatientId());
            Doctor doctor = this.doctorRepository.getById(appm.getDoctorId());
            List<String> services = appm.getServiceIds().stream().map(service ->{
                ClinicServices s = this.serviceRepository.getById(service);

                return s.getServiceName();
            }).toList();

            return appointmentMapper.getAppointment(appm,patient,doctor,services);
        }).toList();
    }

    @Override
    public List<AppointmentDto> getAllByPatient(Long id) {
        return appointmentRepository.findAllByPatientId(id).stream().map(appm ->{
            Patient patient = patientService.getById(appm.getPatientId());
            Doctor doctor = this.doctorRepository.getById(appm.getDoctorId());
            List<String> services = appm.getServiceIds().stream().map(service ->{
                ClinicServices s = this.serviceRepository.getById(service);

                return s.getServiceName();
            }).toList();

            return appointmentMapper.getAppointment(appm,patient,doctor,services);
        }).toList();
    }

    @Override
    public Appointment save(CreateAppointmentDto appointment) {
        return appointmentRepository.save(appointmentMapper.createAppointment(appointment));
    }

    @Override
    public Appointment update(Appointment appointment) {
        Appointment old = this.getById(appointment.getAppointmentId());
        return  appointmentRepository.save(appointmentMapper.updateAppointment(old,appointment));
    }

    @Override
    public void delete(Long id) {
        appointmentRepository.deleteById(id);
    }

    @Override
    public List<AppointmentDateDto> getAppointmentDates() {
        List<ClinicSchedule> clinicSchedules = clinicScheduleRepository.findAll().stream().filter(cs -> cs.getClinicId() == 1L).toList();
        return this.getAll()
                .stream()
                .map(appm -> {
                    /*LocalDate currentDate = appm.getDate().toLocalDate();*/
                    boolean isBookedForEntireDay = clinicSchedules.stream()
                            .filter(cs -> cs.getStartTime().toLocalDate().isEqual(LocalDate.of(2024, 1, 22)))
                            .allMatch(ClinicSchedule::getIsBooked);

                    return isBookedForEntireDay ? new AppointmentDateDto(appm.getDate()) : null;
                })
                .filter(Objects::nonNull)
                .toList();
    }

    @Override
    public Appointment createAppointmentByReceptionist(AppointmentByReceptionistDto dto) throws Exception {
        System.out.println("===========BY RECEPTIONIST=============");
        System.out.println(dto);
        CreatePatientDto createPatientDto = new CreatePatientDto(dto.getPatientName(), dto.getGender(), dto.getAddress(), dto.getContactNumber(), dto.getEmail(), dto.getBirthDay());
        Patient patient = patientService.save(createPatientDto);
        ClinicSchedule clinicSchedule = clinicScheduleRepository.findClinicScheduleByClinicIdAndStartTime(dto.getClinicId(),dto.getAppointment());

        CreateAppointmentDto createAppointmentDto = new CreateAppointmentDto(patient.getPatientId(),1L, dto.getClinicId(), dto.getAppointment(), dto.getServiceId());
        clinicSchedule.setIsBooked(true);
        clinicScheduleRepository.save(clinicSchedule);
        return this.save(createAppointmentDto);
    }
}

