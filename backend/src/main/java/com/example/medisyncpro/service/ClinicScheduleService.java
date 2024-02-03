package com.example.medisyncpro.service;

import com.example.medisyncpro.model.Settings;
import com.example.medisyncpro.model.dto.ClinicScheduleDto;
import com.example.medisyncpro.model.dto.ClinicScheduleResultDto;
import com.example.medisyncpro.model.dto.CreateClinicSchedulesDto;
import com.example.medisyncpro.model.ClinicSchedule;
import org.springframework.data.domain.PageRequest;

import java.util.Date;
import java.util.List;
import java.util.Map;

public interface ClinicScheduleService {

    ClinicSchedule getById(Long id);

    List<ClinicSchedule> getAll();

    ClinicSchedule save(CreateClinicSchedulesDto clinicSchedule);
    ClinicSchedule update(ClinicSchedule clinicSchedule);

    public List<ClinicSchedule> generateSchedules(Long settingsId);

    void delete(Long id);

    ClinicScheduleResultDto getAllByClinicGroupedByDate(Long clinicId, PageRequest pageable, String sort);
}

