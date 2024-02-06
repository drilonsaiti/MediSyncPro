package com.example.medisyncpro.service;

import com.example.medisyncpro.model.ClinicSchedule;
import com.example.medisyncpro.model.dto.ClinicScheduleResultDto;
import com.example.medisyncpro.model.dto.CreateClinicSchedulesDto;
import org.springframework.data.domain.PageRequest;

import java.text.ParseException;
import java.util.List;

public interface ClinicScheduleService {

    ClinicSchedule getById(Long id);

    List<ClinicSchedule> getAll();

    ClinicSchedule save(CreateClinicSchedulesDto clinicSchedule);

    ClinicSchedule update(ClinicSchedule clinicSchedule);

    public List<ClinicSchedule> generateSchedules(Long settingsId);

    void delete(Long id);

    void deleteGrouped(Long id, String date) throws ParseException;

    ClinicScheduleResultDto getAllByClinicGroupedByDate(Long clinicId, PageRequest pageable, String sort);
}

