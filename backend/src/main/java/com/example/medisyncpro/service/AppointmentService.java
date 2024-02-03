package com.example.medisyncpro.service;

import com.example.medisyncpro.model.dto.*;
import com.example.medisyncpro.model.Appointment;
import org.springframework.data.domain.PageRequest;

import java.util.List;

public interface AppointmentService {

    Appointment getById(Long id);

    AppointmentResultDto getAll(PageRequest pageable, String nameOrEmail);
    List<AppointmentDto> getAllByPatient(Long id);

    List<AppointmentDto> getAllByDoctor(Long id);
    Appointment save(CreateAppointmentDto appointment);
    Appointment update(Appointment appointment);

    void delete(Long id);

    List<AppointmentDateDto> getAppointmentDates();

    Appointment createAppointmentByReceptionist(AppointmentByReceptionistDto dto) throws Exception;

    void changeAttended(Long id,boolean attended);
}

