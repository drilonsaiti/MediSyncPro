package com.example.medisyncpro.model.mapper;

import com.example.medisyncpro.model.ClinicServices;
import com.example.medisyncpro.model.Doctor;
import com.example.medisyncpro.model.Patient;
import com.example.medisyncpro.model.dto.AppointmentDto;
import com.example.medisyncpro.model.dto.CreateAppointmentDto;
import com.example.medisyncpro.model.Appointment;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentMapper {

    public Appointment createAppointment(CreateAppointmentDto dto) {
        Appointment appointment = new Appointment();
        appointment.setPatientId(dto.getPatientId());
        appointment.setDoctorId(dto.getDoctorId());
        appointment.setClinicId(dto.getClinicId());
        appointment.setDate(dto.getDate());
        appointment.setAllServicesIds(dto.getServiceId());
        return appointment;
    }

    public Appointment updateAppointment(Appointment old, Appointment newAppointment) {
        old.setPatientId(newAppointment.getPatientId());
        old.setDoctorId(newAppointment.getDoctorId());
        old.setClinicId(newAppointment.getClinicId());
        old.setDate(newAppointment.getDate());
        old.setAllServicesIds(newAppointment.getServiceIds());
        old.setAttended(newAppointment.isAttended());
        return old;
    }

    public AppointmentDto getAppointment(Appointment appm, Patient patient, Doctor doctor, List<String> services){
        return new AppointmentDto(
                appm.getAppointmentId(),
                patient.getPatientId(),
                patient.getPatientName(),
                patient.getEmail(),
                doctor.getDoctorName(),
                doctor.getSpecialization().getSpecializationName(),
                appm.getDate(),
                services,
                false
        );
    }

    /*public AppointmentDateDto getAppointmentDates(List<ClinicSchedule> list){
        return list.stream().map(data -> new AppointmentDateDto(data.getStartTime().toLocalDate()));
    }*/
}
