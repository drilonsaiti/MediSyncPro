package com.example.medisyncpro.web.rest;

import com.example.medisyncpro.model.MedicalReport;
import com.example.medisyncpro.model.dto.CreateMedicalReportDto;
import com.example.medisyncpro.model.dto.MedicalReportResultDto;
import com.example.medisyncpro.model.excp.MedicalReportException;
import com.example.medisyncpro.service.MedicalReportService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/medicalReports")
@CrossOrigin
public class MedicalReportRestController {

    private final MedicalReportService medicalReportService;

    @GetMapping
    public ResponseEntity<?> listMedicalReports(@RequestParam(defaultValue = "0") int page,
                                                @RequestParam(defaultValue = "all") String nameOrEmail,
                                                @RequestParam(defaultValue = "all") String byDate
    ) {
        try {
            PageRequest pageable = PageRequest.of(page - 1, 15);
            MedicalReportResultDto report = medicalReportService.getAll(pageable, nameOrEmail, byDate);
            return new ResponseEntity(new PageImpl<>(report.getMedicalReport(), pageable, report.getTotalElements()), HttpStatus.OK);
        } catch (MedicalReportException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getMedicalReportById(@PathVariable Long id) {
        try {
            return new ResponseEntity<>(medicalReportService.getById(id), HttpStatus.OK);
        } catch (MedicalReportException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<?> createMedicalReport(@RequestBody CreateMedicalReportDto dto) {
        try {
            this.medicalReportService.save(dto);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (MedicalReportException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping()
    public ResponseEntity<?> updateMedicalReport(@RequestBody MedicalReport patient) {
        try {
            medicalReportService.update(patient);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (MedicalReportException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMedicalReport(@PathVariable Long id) {
        try {
            medicalReportService.delete(id);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        } catch (MedicalReportException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
