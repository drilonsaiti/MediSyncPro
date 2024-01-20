package com.example.medisyncpro.repository;

import com.example.medisyncpro.model.ClinicServices;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceRepository extends JpaRepository<ClinicServices, Long> {
}

