package com.example.medisyncpro.web.rest;


import com.example.medisyncpro.dto.CreateMedicalReportDto;
import com.example.medisyncpro.dto.CreatePatientDto;
import com.example.medisyncpro.model.MedicalReport;
import com.example.medisyncpro.model.Patient;
import com.example.medisyncpro.service.DoctorService;
import com.example.medisyncpro.service.MedicalReportService;
import com.example.medisyncpro.service.PatientService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/medicalReports")
@CrossOrigin
public class MedicalReportRestController {

    private final MedicalReportService medicalReportService;

    @GetMapping
    public ResponseEntity<List<MedicalReport>> listMedicalReports() {
        System.out.println("ITS HERE REST CONTROLLER");
        List<MedicalReport> medicalReports = medicalReportService.getAll();
        return new ResponseEntity<>(medicalReports, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicalReport> getMedicalReportById(@PathVariable Long id) {

        return new ResponseEntity<>(medicalReportService.getById(id), HttpStatus.OK);
    }


    @PostMapping
    public ResponseEntity<Void> createMedicalReport(@RequestBody CreateMedicalReportDto dto) {
        this.medicalReportService.save(dto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping()
    public ResponseEntity<Void> updateMedicalReport(@RequestBody MedicalReport patient) {
        medicalReportService.update(patient);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedicalReport(@PathVariable Long id){
        medicalReportService.delete(id);

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

}
