package com.example.medisyncpro.service.impl;

import com.example.medisyncpro.model.Settings;
import com.example.medisyncpro.model.dto.SettingsDTO;
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
        return settingsRepository.findAll().stream().map(settings -> settingsMapper.toDTO(settings)).toList();
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
    public SettingsDTO updateSettings(SettingsDTO dto) {
        System.out.println("=======SETTINGS DTO=========");
        System.out.println(dto);
        Settings settings = settingsMapper.updateSettings(dto,this.getSettingsById(dto.getId()));
        settingsRepository.save(settings);
        return dto;
    }

    @Override
    public void deleteSettings(Long id) {
        settingsRepository.deleteById(id);
    }
}
