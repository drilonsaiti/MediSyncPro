package com.example.medisyncpro.model.mapper;

import com.example.medisyncpro.model.Doctor;
import com.example.medisyncpro.model.dto.CreateClinicSchedulesDto;
import com.example.medisyncpro.model.ClinicSchedule;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
public class ClinicScheduleMapper {

    public ClinicSchedule createClinicSchedule(CreateClinicSchedulesDto dto){
        return new ClinicSchedule(
                dto.getDoctorId(),
                dto.getClinicId(),
                dto.getDate(),
                dto.getStartTime(),
                dto.getEndTime()
        );
    }

    public ClinicSchedule updateClinicSchedule(ClinicSchedule old,ClinicSchedule newSchedule){
        old.setDoctorId(newSchedule.getDoctorId());
        old.setClinicId(newSchedule.getClinicId());
        old.setDate(newSchedule.getDate());
        old.setStartTime(newSchedule.getStartTime());
        old.setEndTime(newSchedule.getEndTime());
        old.setIsBooked(newSchedule.getIsBooked());

        return old;
    }

    public static ClinicSchedule mapToClinicSchedule(Doctor doctor, LocalDate currentDate, LocalDateTime currentDateTime, int appointmentDurationMinutes) {
        ClinicSchedule schedule = new ClinicSchedule();
        schedule.setDoctorId(doctor.getDoctorId());
        schedule.setClinicId(doctor.getClinic().getClinicId());
        schedule.setDate(Date.valueOf(currentDate));
        schedule.setStartTime(currentDateTime);
        schedule.setEndTime(currentDateTime.plusMinutes(appointmentDurationMinutes));
        schedule.setIsBooked(false);
        return schedule;
    }
}
