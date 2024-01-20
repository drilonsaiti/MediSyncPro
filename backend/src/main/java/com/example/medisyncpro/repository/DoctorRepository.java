package com.example.medisyncpro.repository;

import com.example.medisyncpro.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
}