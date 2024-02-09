package com.example.medisyncpro.service;

import com.example.medisyncpro.model.Appointment;
import com.example.medisyncpro.model.dto.*;
import org.springframework.data.domain.PageRequest;

import java.util.List;

public interface AppointmentService {

    Appointment getById(Long id);

    AppointmentResultDto getAll(PageRequest pageable, String nameOrEmail, String types);

    List<AppointmentDto> getAllByPatient(Long id);

    List<AppointmentDto> getAllByDoctor(Long id);

    Appointment save(CreateAppointmentDto appointment);

    Appointment update(AppointmentDto appointment) throws Exception;

    void delete(Long id);

    List<AppointmentDateDto> getAppointmentDates();

    Appointment createAppointmentByReceptionist(AppointmentByReceptionistDto dto) throws Exception;

    void changeAttended(Long id, boolean attended);

    AppointmentDto nexAppointment(Long id);
}

