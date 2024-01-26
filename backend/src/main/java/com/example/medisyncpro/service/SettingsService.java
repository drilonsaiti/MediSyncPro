package com.example.medisyncpro.service;

import com.example.medisyncpro.model.Settings;

import java.util.List;

public interface SettingsService {
    List<Settings> getAllSettings();
    Settings getSettingsById(Long id);
    Settings saveSettings(Settings settings);
    void deleteSettings(Long id);
}