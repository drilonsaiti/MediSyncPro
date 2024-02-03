package com.example.medisyncpro.repository;

import com.example.medisyncpro.model.MedicalReport;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MedicalReportRepository extends JpaRepository<MedicalReport, Long> {

    Optional<MedicalReport> findByAppointmentId(Long id);
}
