package com.example.medisyncpro.web.rest;


import com.example.medisyncpro.model.dto.ClinicServicesResultDto;
import com.example.medisyncpro.model.dto.CreateClinicServicesDto;
import com.example.medisyncpro.model.ClinicServices;
import com.example.medisyncpro.model.dto.ServiceBySpecializationIdDto;
import com.example.medisyncpro.model.dto.ServiceForClinicsDto;
import com.example.medisyncpro.service.ClinicServicesService;
import com.example.medisyncpro.service.SpecializationService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
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
    public Page<ClinicServices> listServices(@RequestParam(defaultValue = "1") int page,
                                             @RequestParam(defaultValue = "all") String specializations,
                                             @RequestParam(defaultValue = "id-asc") String sort) {
        PageRequest pageable = PageRequest.of(page - 1, 15);
       ClinicServicesResultDto services = clinicServicesService.getAll(pageable,specializations,sort);
        return new PageImpl<>(services.getServices(), pageable,services.getTotalElements());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClinicServices> getClinicServiceById(@PathVariable Long id) {

        return new ResponseEntity<>(clinicServicesService.getById(id), HttpStatus.OK);
    }

    @GetMapping("/clinic")
    public ResponseEntity<List<ServiceForClinicsDto>> getClinicServiceForClinic() {

        return new ResponseEntity<>(clinicServicesService.getClinicServiceForClinic(), HttpStatus.OK);
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

