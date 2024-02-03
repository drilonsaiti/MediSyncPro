package com.example.medisyncpro.web.rest;

import com.example.medisyncpro.model.Settings;
import com.example.medisyncpro.model.dto.SettingsDTO;
import com.example.medisyncpro.service.SettingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/settings")
@RequiredArgsConstructor
@CrossOrigin
public class SettingsRestController {

    private final SettingsService settingsService;


    @GetMapping
    public List<SettingsDTO> getAllSettings() {
        return settingsService.getAllSettings();
    }

    @GetMapping("/{id}")
    public Settings getSettingsById(@PathVariable Long id) {
        return settingsService.getSettingsById(id);
    }

    @PostMapping
    public Settings createSettings(@RequestBody Settings settings) {
        return settingsService.saveSettings(settings);
    }

    @PutMapping("/{id}")
    public SettingsDTO updateSettings(@PathVariable Long id, @RequestBody SettingsDTO settings) {
        return settingsService.updateSettings(settings);
    }

    @DeleteMapping("/{id}")
    public void deleteSettings(@PathVariable Long id) {
        settingsService.deleteSettings(id);
    }
}

