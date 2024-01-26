package com.example.medisyncpro.web.rest;


import com.example.medisyncpro.model.dto.CreatePatientDto;
import com.example.medisyncpro.model.Patient;

import com.example.medisyncpro.service.PatientService;
import lombok.AllArgsConstructor;
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
    public ResponseEntity<Iterable<Patient>> listPatients() {
        Iterable<Patient> patients = patientService.getAll();
        return new ResponseEntity<>(patients, HttpStatus.OK);
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
    public ResponseEntity<Void> updatePatient(@RequestBody Patient patient) {
        patientService.update(patient);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable Long id){
        patientService.delete(id);

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }


}
