package com.example.medisyncpro.web.rest;

import com.example.medisyncpro.model.Settings;
import com.example.medisyncpro.model.dto.SettingsDTO;
import com.example.medisyncpro.model.excp.SettingsException;
import com.example.medisyncpro.service.SettingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/settings")
@RequiredArgsConstructor
@CrossOrigin
public class SettingsRestController {

    private final SettingsService settingsService;

    @GetMapping
    public ResponseEntity<?> getAllSettings() {
        try {
            List<SettingsDTO> settings = settingsService.getAllSettings();
            return new ResponseEntity<>(settings, HttpStatus.OK);
        } catch (SettingsException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSettingsById(@PathVariable Long id) {
        try {
            Settings settings = settingsService.getSettingsById(id);
            return new ResponseEntity<>(settings, HttpStatus.OK);
        } catch (SettingsException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping
    public ResponseEntity<?> createSettings(@RequestBody Settings settings) {
        try {
            Settings createdSettings = settingsService.saveSettings(settings);
            return new ResponseEntity<>(createdSettings, HttpStatus.CREATED);
        } catch (SettingsException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateSettings(@PathVariable Long id, @RequestBody SettingsDTO settings) {
        try {
            SettingsDTO updatedSettings = settingsService.updateSettings(settings);
            return new ResponseEntity<>(updatedSettings, HttpStatus.OK);
        } catch (SettingsException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSettings(@PathVariable Long id) {
        try {
            settingsService.deleteSettings(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (SettingsException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
