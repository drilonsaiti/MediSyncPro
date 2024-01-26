package com.example.medisyncpro.web.rest;

import com.example.medisyncpro.model.dto.AppointmentByReceptionistDto;
import com.example.medisyncpro.model.dto.AppointmentDateDto;
import com.example.medisyncpro.model.dto.AppointmentDto;
import com.example.medisyncpro.model.dto.CreateAppointmentDto;
import com.example.medisyncpro.model.Appointment;
import com.example.medisyncpro.service.*;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/appointments")
@CrossOrigin
public class AppointmentRestController {

    private final AppointmentService appointmentService;

    @GetMapping
    public ResponseEntity<Iterable<AppointmentDto>> listAppointments() {
        Iterable<AppointmentDto> appointments = appointmentService.getAll();
        return new ResponseEntity<>(appointments, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable Long id) {

        return new ResponseEntity<>(appointmentService.getById(id), HttpStatus.OK);
    }

    @GetMapping("/patient/{id}")
    public ResponseEntity<Iterable<AppointmentDto>> getAppointmentByPatient(@PathVariable Long id) {

        Iterable<AppointmentDto> appointments = appointmentService.getAllByPatient(id);
        return new ResponseEntity<>(appointments, HttpStatus.OK);
    }



    @PostMapping
    public ResponseEntity<Void> createAppointments(@RequestBody CreateAppointmentDto dto) {
        this.appointmentService.save(dto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping()
    public ResponseEntity<Void> updateAppointments(@RequestBody Appointment Appointments) {
        appointmentService.update(Appointments);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointments(@PathVariable Long id){
        appointmentService.delete(id);

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @GetMapping("/dates")
    public ResponseEntity<Iterable<AppointmentDateDto>> getAppointmentDates() {
        Iterable<AppointmentDateDto> appointments = appointmentService.getAppointmentDates();
        System.out.println(appointments);
        return new ResponseEntity<>(appointments, HttpStatus.OK);
    }

    @PostMapping("byReceptionist")
    public ResponseEntity<Void> createAppointmentByReceptionist(@RequestBody AppointmentByReceptionistDto dto) throws Exception {
        this.appointmentService.createAppointmentByReceptionist(dto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

}
