package com.example.medisyncpro.web.rest;


import com.example.medisyncpro.model.ClinicSchedule;
import com.example.medisyncpro.model.dto.ClinicScheduleResultDto;
import com.example.medisyncpro.model.dto.CreateClinicSchedulesDto;
import com.example.medisyncpro.model.dto.GroupedClinicSchedule;
import com.example.medisyncpro.model.excp.ClinicScheduleException;
import com.example.medisyncpro.service.ClinicScheduleService;
import com.example.medisyncpro.service.DoctorService;
import com.example.medisyncpro.service.SettingsService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/clinicSchedules")
@CrossOrigin
public class ClinicScheduleRestController {

    private final ClinicScheduleService clinicScheduleService;
    private final DoctorService doctorService;
    private final SettingsService service;

    @GetMapping
    public ResponseEntity<?> listClinicSchedules() {
        try {
            List<ClinicSchedule> clinicSchedules = clinicScheduleService.getAll();
            return new ResponseEntity<>(clinicSchedules, HttpStatus.OK);
        } catch (ClinicScheduleException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getClinicSchedulesById(@PathVariable Long id) {
        try {
            ClinicSchedule clinicSchedule = clinicScheduleService.getById(id);
            return new ResponseEntity<>(clinicSchedule, HttpStatus.OK);
        } catch (ClinicScheduleException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<?> createClinicSchedules(@RequestBody CreateClinicSchedulesDto dto) {
        try {
            clinicScheduleService.save(dto);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (ClinicScheduleException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping()
    public ResponseEntity<?> updateClinicSchedules(@RequestBody ClinicSchedule clinicServices) {
        try {
            clinicScheduleService.update(clinicServices);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (ClinicScheduleException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteClinicSchedules(@PathVariable Long id) {
        try {
            clinicScheduleService.delete(id);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        } catch (ClinicScheduleException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/generate/{id}")
    public ResponseEntity<?> generateClinicSchedules(@PathVariable Long id) {
        try {
            Iterable<ClinicSchedule> clinicSchedules = clinicScheduleService.generateSchedules(id);
            return new ResponseEntity<>(clinicSchedules, HttpStatus.OK);
        } catch (ClinicScheduleException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/grouped/{id}")
    public ResponseEntity<?> getAllByClinicGroupedByDate(@PathVariable Long id,
                                                         @RequestParam(defaultValue = "1") int page,
                                                         @RequestParam(defaultValue = "startDate-asc") String sort) {
        try {
            PageRequest pageable = PageRequest.of(page - 1, 15);
            ClinicScheduleResultDto results = clinicScheduleService.getAllByClinicGroupedByDate(id, pageable, sort);
            return new ResponseEntity<>(new PageImpl<>(results.getClinicSchedule(), pageable, results.getTotalElements()), HttpStatus.OK);
        } catch (ClinicScheduleException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/grouped/{id}/{date}")
    public ResponseEntity<?> deleteClinicSchedulesGrouped(@PathVariable Long id, @PathVariable String date) {
        try {
            clinicScheduleService.deleteGrouped(id, date);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        } catch (ClinicScheduleException | ParseException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
