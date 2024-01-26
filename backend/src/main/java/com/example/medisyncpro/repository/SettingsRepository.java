package com.example.medisyncpro.repository;

import com.example.medisyncpro.model.Settings;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SettingsRepository extends JpaRepository<Settings, Long> {
    // Add custom query methods if needed
}
