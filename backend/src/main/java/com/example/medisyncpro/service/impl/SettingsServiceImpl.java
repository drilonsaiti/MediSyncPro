package com.example.medisyncpro.service.impl;

import com.example.medisyncpro.model.Settings;
import com.example.medisyncpro.model.dto.SettingsDTO;
import com.example.medisyncpro.model.excp.SettingsException;
import com.example.medisyncpro.model.mapper.SettingsMapper;
import com.example.medisyncpro.repository.SettingsRepository;
import com.example.medisyncpro.service.SettingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SettingsServiceImpl implements SettingsService {

    private final SettingsRepository settingsRepository;
    private final SettingsMapper settingsMapper;

    @Override
    public List<SettingsDTO> getAllSettings() {
        try {
            return settingsRepository.findAll().stream().map(settings -> settingsMapper.toDTO(settings)).toList();
        } catch (Exception e) {
            throw new SettingsException("Error retrieving all settings");
        }
    }

    @Override
    public Settings getSettingsById(Long id) {
        try {
            return settingsRepository.findById(id)
                    .orElseThrow(() -> new SettingsException("Settings not found with id: " + id));
        } catch (Exception e) {
            throw new SettingsException("Error retrieving settings by id: " + id, e);
        }
    }

    @Override
    public Settings saveSettings(Settings settings) {
        try {
            return settingsRepository.save(settings);
        } catch (Exception e) {
            throw new SettingsException("Error saving settings", e);
        }
    }

    @Override
    public SettingsDTO updateSettings(SettingsDTO dto) {
        try {
            Settings settings = settingsRepository.findById(dto.getId())
                    .orElseThrow(() -> new SettingsException("Settings not found with id: " + dto.getId()));
            Settings updatedSettings = settingsMapper.updateSettings(dto, settings);
            settingsRepository.save(updatedSettings);
            return dto;
        } catch (Exception e) {
            throw new SettingsException("Error updating settings", e);
        }
    }

    @Override
    public void deleteSettings(Long id) {
        try {
            settingsRepository.deleteById(id);
        } catch (Exception e) {
            throw new SettingsException("Error deleting settings", e);
        }
    }
}
