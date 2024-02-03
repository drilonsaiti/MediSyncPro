package com.example.medisyncpro.model.dto;

import com.example.medisyncpro.model.ClinicSchedule;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
public class ClinicScheduleResultDto {
    private List<GroupedClinicSchedule> clinicSchedule;
    private int totalElements;
}
