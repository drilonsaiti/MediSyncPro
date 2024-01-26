package com.example.medisyncpro.web.rest;


import com.example.medisyncpro.model.dto.CreateDoctorDto;
import com.example.medisyncpro.model.Doctor;
import com.example.medisyncpro.service.DoctorService;
import com.example.medisyncpro.service.SpecializationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/doctors")
@CrossOrigin
public class DoctorRestController {

    private final DoctorService doctorService;
    private final SpecializationService specializationService;

    @GetMapping
    public ResponseEntity<Iterable<Doctor>> listDoctors() {
        Iterable<Doctor> doctors = doctorService.getAll();
        return new ResponseEntity<>(doctors, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable Long id) {

        return new ResponseEntity<>(doctorService.getById(id), HttpStatus.OK);
    }


    @PostMapping
    public ResponseEntity<Void> createDoctor(@RequestBody CreateDoctorDto dto) {
        this.doctorService.save(dto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping()
    public ResponseEntity<Void> updateDoctor(@RequestBody Doctor patient) {
        doctorService.update(patient);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDoctor(@PathVariable Long id){
        doctorService.delete(id);

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

}

