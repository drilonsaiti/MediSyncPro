package com.example.medisyncpro.service.impl;

import com.example.medisyncpro.dto.AppointmentDateDto;
import com.example.medisyncpro.dto.CreateAppointmentDto;
import com.example.medisyncpro.mapper.AppointmentMapper;
import com.example.medisyncpro.model.Appointment;
import com.example.medisyncpro.model.ClinicSchedule;
import com.example.medisyncpro.model.ClinicServices;
import com.example.medisyncpro.repository.AppointmentRepository;
import com.example.medisyncpro.repository.ClinicScheduleRepository;
import com.example.medisyncpro.repository.ServiceRepository;
import com.example.medisyncpro.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Override
    public Appointment getById(Long id) {
        return appointmentRepository.findById(id).orElse(null);
    }

    @Override
    public List<Appointment> getAll() {
        return appointmentRepository.findAll();
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

                    return isBookedForEntireDay ? new AppointmentDateDto(LocalDateTime.parse("2024-01-22T10:15:30")) : null;
                })
                .filter(Objects::nonNull)
                .toList();
    }
}

