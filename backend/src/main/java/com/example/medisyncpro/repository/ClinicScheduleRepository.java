package com.example.medisyncpro.repository;

import com.example.medisyncpro.model.ClinicSchedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ClinicScheduleRepository extends JpaRepository<ClinicSchedule, Long> {

    ClinicSchedule findClinicScheduleByClinicIdAndStartTime(Long id, LocalDateTime startTime);
    ClinicSchedule findClinicScheduleByClinicId(Long id);
}

