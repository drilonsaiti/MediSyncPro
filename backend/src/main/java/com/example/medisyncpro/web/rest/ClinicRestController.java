package com.example.medisyncpro.web.rest;



import com.example.medisyncpro.model.Clinic;
import com.example.medisyncpro.service.ClinicService;
import com.example.medisyncpro.service.DoctorService;
import com.example.medisyncpro.service.SpecializationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/clinics")
@CrossOrigin
public class ClinicRestController {

    private final ClinicService clinicService;
    private final SpecializationService specializationService;
    private final DoctorService doctorService;

    @GetMapping
    public ResponseEntity<Iterable<Clinic>> listClinics() {
        Iterable<Clinic> clinics = clinicService.getAll();
        return new ResponseEntity<>(clinics, HttpStatus.OK);
    }

    @GetMapping("/add")
    public ResponseEntity showAddClinicForm() {
       /* ClinicFormDto clinicFormDto = new ClinicFormDto(
                specializationService.getAll(),
                doctorService.getAll(),
                new Clinic()
        );*/
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<Void> saveClinic(@RequestBody Clinic clinic) {
        clinicService.save(clinic);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

}
