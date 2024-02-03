package com.example.medisyncpro.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
public class GroupedClinicSchedule {
    private Date date;
    List<ClinicScheduleDto> scheduleDtos;
}
