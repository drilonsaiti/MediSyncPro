package com.example.medisyncpro.web.rest;



import com.example.medisyncpro.model.Clinic;
import com.example.medisyncpro.model.ClinicServices;
import com.example.medisyncpro.model.dto.ClinicDto;
import com.example.medisyncpro.model.dto.ClinicResultDto;
import com.example.medisyncpro.model.dto.ReceptionistDto;
import com.example.medisyncpro.model.dto.UpdateClinicDto;
import com.example.medisyncpro.service.ClinicService;
import com.example.medisyncpro.service.DoctorService;
import com.example.medisyncpro.service.SpecializationService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/clinics")
@CrossOrigin
public class ClinicRestController {

    private final ClinicService clinicService;
    private final SpecializationService specializationService;
    private final DoctorService doctorService;


    @GetMapping
    public Page<ClinicDto> listClinics(@RequestParam(defaultValue = "0") int page,
                                                           @RequestParam(defaultValue = "all") String specializations,
                                                           @RequestParam(defaultValue = "all") String service,
                                                            @RequestParam(defaultValue = "all") String byDate) {

        PageRequest pageable = PageRequest.of(page - 1, 15);
        ClinicResultDto clinicDtoList = clinicService.getAll(pageable,specializations,service, byDate);

        return new PageImpl<>(clinicDtoList.getClinics(), pageable, clinicDtoList.getTotalElements());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClinicDto> getById(@PathVariable Long id) {
        System.out.println(id);
        return new ResponseEntity<>(clinicService.getByIdDto(id), HttpStatus.OK);
    }

    @GetMapping("/services/{id}")
    public ResponseEntity<List<ClinicServices>> getClinicServiceById(@PathVariable Long id) {

        return new ResponseEntity<>(clinicService.getClinicServicesById(id), HttpStatus.OK);
    }

    @PutMapping()
    public ResponseEntity<Clinic> updateClinic(@RequestBody UpdateClinicDto dto){
        return new ResponseEntity<>(clinicService.updateClinic(dto),HttpStatus.ACCEPTED);
    }

    @PostMapping("/save")
    public ResponseEntity<Void> saveClinic(@RequestBody Clinic clinic) {
        clinicService.save(clinic);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

}
