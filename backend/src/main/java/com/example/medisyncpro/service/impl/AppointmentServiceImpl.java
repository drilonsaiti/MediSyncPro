package com.example.medisyncpro.service.impl;

import com.example.medisyncpro.dto.CreateAppointmentDto;
import com.example.medisyncpro.mapper.AppointmentMapper;
import com.example.medisyncpro.model.Appointment;
import com.example.medisyncpro.repository.AppointmentRepository;
import com.example.medisyncpro.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {


    private final AppointmentRepository appointmentRepository;
    private final AppointmentMapper appointmentMapper;

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
}

