package com.example.medisyncpro.repository;

import com.example.medisyncpro.model.ClinicServices;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServiceRepository extends JpaRepository<ClinicServices, Long> {

    List<ClinicServices> findAllBySpecializations_SpecializationId(Long id);
}

