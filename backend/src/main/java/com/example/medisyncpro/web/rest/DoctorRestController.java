package com.example.medisyncpro.web.rest;


import com.example.medisyncpro.model.dto.CreateDoctorDto;
import com.example.medisyncpro.model.Doctor;
import com.example.medisyncpro.model.dto.DoctorResultDto;
import com.example.medisyncpro.service.DoctorService;
import com.example.medisyncpro.service.SpecializationService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
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
    public Page<Doctor> listDoctors(@RequestParam(defaultValue = "0") int page,
                                    @RequestParam(defaultValue = "all") String specializations,
                                    @RequestParam(defaultValue = "all") String service) {
        PageRequest pageable = PageRequest.of(page - 1, 15);
        DoctorResultDto clinicDtoList = doctorService.getAll(pageable,specializations,service);

        return new PageImpl<>(clinicDtoList.getClinics(), pageable, clinicDtoList.getTotalElements());
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

