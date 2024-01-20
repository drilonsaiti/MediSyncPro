package com.example.medisyncpro.repository;

import com.example.medisyncpro.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, Long> {
}