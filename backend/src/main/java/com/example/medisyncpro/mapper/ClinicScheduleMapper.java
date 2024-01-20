package com.example.medisyncpro.mapper;

import com.example.medisyncpro.dto.CreateClinicSchedulesDto;
import com.example.medisyncpro.model.ClinicSchedule;
import org.springframework.stereotype.Service;

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
}
