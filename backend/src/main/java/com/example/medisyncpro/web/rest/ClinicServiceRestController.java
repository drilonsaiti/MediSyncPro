package com.example.medisyncpro.web.rest;


import com.example.medisyncpro.model.dto.CreateClinicServicesDto;
import com.example.medisyncpro.model.ClinicServices;
import com.example.medisyncpro.service.ClinicServicesService;
import com.example.medisyncpro.service.SpecializationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/clinic-services")
@CrossOrigin
public class ClinicServiceRestController {

    private final ClinicServicesService clinicServicesService;
    private final SpecializationService specializationService;


    @GetMapping
    public ResponseEntity<List<ClinicServices>> listServices() {
        List<ClinicServices> services = clinicServicesService.getAll();
        return new ResponseEntity<>(services, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClinicServices> getClinicServiceById(@PathVariable Long id) {

        return new ResponseEntity<>(clinicServicesService.getById(id), HttpStatus.OK);
    }


    @PostMapping
    public ResponseEntity<Void> createClinicServices(@RequestBody CreateClinicServicesDto dto) {
        this.clinicServicesService.save(dto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping()
    public ResponseEntity<Void> updateClinicServices(@RequestBody ClinicServices clinicServices) {
        clinicServicesService.update(clinicServices);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClinicServices(@PathVariable Long id){
        clinicServicesService.delete(id);

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

}

