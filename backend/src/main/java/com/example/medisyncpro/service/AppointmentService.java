package com.example.medisyncpro.service;

import com.example.medisyncpro.model.Appointment;

import java.util.List;

public interface AppointmentService {

    Appointment getById(Long id);

    List<Appointment> getAll();

    Appointment save(Appointment appointment);

    void delete(Long id);
}

