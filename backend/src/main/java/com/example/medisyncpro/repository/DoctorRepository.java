package com.example.medisyncpro.repository;

import com.example.medisyncpro.model.Clinic;
import com.example.medisyncpro.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    List<Doctor> findAllByClinic(Clinic clinic);
}