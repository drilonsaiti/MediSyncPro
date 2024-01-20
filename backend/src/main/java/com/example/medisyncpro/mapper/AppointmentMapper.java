package com.example.medisyncpro.mapper;

import com.example.medisyncpro.dto.CreateAppointmentDto;
import com.example.medisyncpro.model.Appointment;
import org.springframework.stereotype.Service;

@Service
public class AppointmentMapper {

    public Appointment createAppointment(CreateAppointmentDto dto) {
        Appointment appointment = new Appointment();
        appointment.setPatientId(dto.getPatientId());
        appointment.setDoctorId(dto.getDoctorId());
        appointment.setClinicId(dto.getClinicId());
        appointment.setDate(dto.getDate());
        appointment.setTimeSlot(dto.getTimeSlot());
        appointment.setServiceId(dto.getServiceId());
        return appointment;
    }

    public Appointment updateAppointment(Appointment old, Appointment newAppointment) {
        old.setPatientId(newAppointment.getPatientId());
        old.setDoctorId(newAppointment.getDoctorId());
        old.setClinicId(newAppointment.getClinicId());
        old.setDate(newAppointment.getDate());
        old.setTimeSlot(newAppointment.getTimeSlot());
        old.setServiceId(newAppointment.getServiceId());
        old.setAttended(newAppointment.isAttended());
        return old;
    }
}
