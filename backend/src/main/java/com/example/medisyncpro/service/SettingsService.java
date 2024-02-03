package com.example.medisyncpro.service;

import com.example.medisyncpro.model.Settings;
import com.example.medisyncpro.model.dto.SettingsDTO;

import java.util.List;

public interface SettingsService {
    List<SettingsDTO> getAllSettings();
    Settings getSettingsById(Long id);
    Settings saveSettings(Settings settings);
    SettingsDTO updateSettings(SettingsDTO settings);
    void deleteSettings(Long id);
}