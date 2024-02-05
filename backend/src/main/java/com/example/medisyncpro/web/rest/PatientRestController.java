package com.example.medisyncpro.web.rest;


import com.example.medisyncpro.model.dto.CreatePatientDto;
import com.example.medisyncpro.model.Patient;

import com.example.medisyncpro.model.dto.MedicalReportResultDto;
import com.example.medisyncpro.model.dto.PatientResultDto;
import com.example.medisyncpro.model.dto.UpdatePatientDto;
import com.example.medisyncpro.service.PatientService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/patients")
@CrossOrigin
public class PatientRestController {

    private final PatientService patientService;

    @GetMapping
    public Page<Patient> listPatients(@RequestParam(defaultValue = "0") int page,
                                       @RequestParam(defaultValue = "all") String nameOrEmail) {
        PageRequest pageable = PageRequest.of(page - 1, 15);
        PatientResultDto patients = patientService.getAll(pageable,nameOrEmail);
        return new PageImpl<>(patients.getPatients(), pageable, patients.getTotalElements());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable Long id) {

        return new ResponseEntity<>(patientService.getById(id), HttpStatus.OK);
    }


    @PostMapping
    public ResponseEntity<Void> createPatient(@RequestBody CreatePatientDto dto) throws Exception {
        this.patientService.save(dto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping()
    public ResponseEntity<Void> updatePatient(@RequestBody UpdatePatientDto patient) {
        patientService.update(patient);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable Long id){
        patientService.delete(id);

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }


}
