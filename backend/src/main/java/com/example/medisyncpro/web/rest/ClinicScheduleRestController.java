package com.example.medisyncpro.web.rest;



import com.example.medisyncpro.dto.CreateClinicSchedulesDto;
import com.example.medisyncpro.dto.CreateClinicServicesDto;
import com.example.medisyncpro.model.ClinicSchedule;
import com.example.medisyncpro.model.ClinicServices;
import com.example.medisyncpro.service.ClinicScheduleService;
import com.example.medisyncpro.service.DoctorService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/clinicSchedules")
public class ClinicScheduleRestController {

    private final ClinicScheduleService clinicScheduleService;
    private final DoctorService doctorService;

    @GetMapping
    public ResponseEntity<Iterable<ClinicSchedule>> listClinicSchedules() {
        Iterable<ClinicSchedule> clinicSchedules = clinicScheduleService.getAll();
        return new ResponseEntity<>(clinicSchedules, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClinicSchedule> getClinicSchedulesById(@PathVariable Long id) {

        return new ResponseEntity<>(clinicScheduleService.getById(id), HttpStatus.OK);
    }


    @PostMapping
    public ResponseEntity<Void> createClinicSchedules(@RequestBody CreateClinicSchedulesDto dto) {
        this.clinicScheduleService.save(dto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping()
    public ResponseEntity<Void> updateClinicSchedules(@RequestBody ClinicSchedule clinicServices) {
        clinicScheduleService.update(clinicServices);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClinicSchedules(@PathVariable Long id){
        clinicScheduleService.delete(id);

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
}
