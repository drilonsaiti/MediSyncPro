package com.example.medisyncpro.repository;

import com.example.medisyncpro.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
}
