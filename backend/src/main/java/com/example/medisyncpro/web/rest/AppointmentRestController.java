package com.example.medisyncpro.web.rest;

import com.example.medisyncpro.dto.CreateAppointmentDto;
import com.example.medisyncpro.dto.CreateClinicServicesDto;
import com.example.medisyncpro.model.Appointment;
import com.example.medisyncpro.model.ClinicServices;
import com.example.medisyncpro.service.*;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/appointments")
public class AppointmentRestController {

    private final AppointmentService appointmentService;

    @GetMapping
    public ResponseEntity<Iterable<Appointment>> listAppointments() {
        Iterable<Appointment> appointments = appointmentService.getAll();
        return new ResponseEntity<>(appointments, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getClinicServiceById(@PathVariable Long id) {

        return new ResponseEntity<>(appointmentService.getById(id), HttpStatus.OK);
    }


    @PostMapping
    public ResponseEntity<Void> createClinicServices(@RequestBody CreateAppointmentDto dto) {
        this.appointmentService.save(dto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping()
    public ResponseEntity<Void> updateClinicServices(@RequestBody Appointment clinicServices) {
        appointmentService.update(clinicServices);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClinicServices(@PathVariable Long id){
        appointmentService.delete(id);

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

}
