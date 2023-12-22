package com.example.medisyncpro.service.impl;

import com.example.medisyncpro.model.Appointment;
import com.example.medisyncpro.repository.AppointmentRepository;
import com.example.medisyncpro.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Override
    public Appointment getById(Long id) {
        return appointmentRepository.findById(id).orElse(null);
    }

    @Override
    public List<Appointment> getAll() {
        return appointmentRepository.findAll();
    }

    @Override
    public Appointment save(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    @Override
    public void delete(Long id) {
        appointmentRepository.deleteById(id);
    }
}

