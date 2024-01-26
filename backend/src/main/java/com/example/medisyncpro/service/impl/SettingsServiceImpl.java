package com.example.medisyncpro.service.impl;

import com.example.medisyncpro.model.Settings;
import com.example.medisyncpro.repository.SettingsRepository;
import com.example.medisyncpro.service.SettingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SettingsServiceImpl implements SettingsService {

    private final SettingsRepository settingsRepository;


    @Override
    public List<Settings> getAllSettings() {
        return settingsRepository.findAll();
    }

    @Override
    public Settings getSettingsById(Long id) {
        return settingsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Settings not found with id: " + id));
    }

    @Override
    public Settings saveSettings(Settings settings) {
        return settingsRepository.save(settings);
    }

    @Override
    public void deleteSettings(Long id) {
        settingsRepository.deleteById(id);
    }
}
