package com.example.medisyncpro.service;

import com.example.medisyncpro.model.dto.AppointmentByReceptionistDto;
import com.example.medisyncpro.model.dto.AppointmentDateDto;
import com.example.medisyncpro.model.dto.AppointmentDto;
import com.example.medisyncpro.model.dto.CreateAppointmentDto;
import com.example.medisyncpro.model.Appointment;

import java.util.List;

public interface AppointmentService {

    Appointment getById(Long id);

    List<AppointmentDto> getAll();
    List<AppointmentDto> getAllByPatient(Long id);
    Appointment save(CreateAppointmentDto appointment);
    Appointment update(Appointment appointment);

    void delete(Long id);

    List<AppointmentDateDto> getAppointmentDates();

    Appointment createAppointmentByReceptionist(AppointmentByReceptionistDto dto) throws Exception;
}

