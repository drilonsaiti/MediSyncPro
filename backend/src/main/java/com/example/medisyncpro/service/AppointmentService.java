package com.example.medisyncpro.service;

import com.example.medisyncpro.dto.AppointmentDateDto;
import com.example.medisyncpro.dto.CreateAppointmentDto;
import com.example.medisyncpro.model.Appointment;

import java.util.List;

public interface AppointmentService {

    Appointment getById(Long id);

    List<Appointment> getAll();

    Appointment save(CreateAppointmentDto appointment);
    Appointment update(Appointment appointment);

    void delete(Long id);

    List<AppointmentDateDto> getAppointmentDates();
}

