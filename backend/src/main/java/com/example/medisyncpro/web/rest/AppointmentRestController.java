package com.example.medisyncpro.web.rest;

import com.example.medisyncpro.model.Appointment;
import com.example.medisyncpro.model.dto.*;
import com.example.medisyncpro.model.excp.ClinicAppointmentException;
import com.example.medisyncpro.service.AppointmentService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
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
    public ResponseEntity<?> listAppointments(@RequestParam(defaultValue = "0") int page,
                                              @RequestParam(defaultValue = "all") String nameOrEmail,
                                              @RequestParam(defaultValue = "all") String types) {

            PageRequest pageable = PageRequest.of(page - 1, 15);
            AppointmentResultDto appointments = appointmentService.getAll(pageable, nameOrEmail,types);
            return new ResponseEntity<>(new PageImpl<>(appointments.getAppointments(), pageable, appointments.getTotalElements()), HttpStatus.OK);

    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getAppointmentById(@PathVariable Long id) {
        try {
            Appointment appointment = appointmentService.getById(id);
            return new ResponseEntity<>(appointment, HttpStatus.OK);
        } catch (ClinicAppointmentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/patient/{id}")
    public ResponseEntity<?> getAppointmentByPatient(@PathVariable Long id) {
        try {
            Iterable<AppointmentDto> appointments = appointmentService.getAllByPatient(id);
            return new ResponseEntity<>(appointments, HttpStatus.OK);
        } catch (ClinicAppointmentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/doctor/{id}")
    public ResponseEntity<?> getAppointmentByDoctor(@PathVariable Long id) {
        try {
            Iterable<AppointmentDto> appointments = appointmentService.getAllByDoctor(id);
            return new ResponseEntity<>(appointments, HttpStatus.OK);
        } catch (ClinicAppointmentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping
    public ResponseEntity<?> createAppointments(@RequestBody CreateAppointmentDto dto) {
        try {
            appointmentService.save(dto);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (ClinicAppointmentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping
    public ResponseEntity<?> updateAppointments(@RequestBody AppointmentDto appointments) {
        try {
            appointmentService.update(appointments);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAppointments(@PathVariable Long id) {
        try {
            appointmentService.delete(id);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        } catch (ClinicAppointmentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/dates")
    public ResponseEntity<?> getAppointmentDates() {
        try {
            Iterable<AppointmentDateDto> appointments = appointmentService.getAppointmentDates();
            return new ResponseEntity<>(appointments, HttpStatus.OK);
        } catch (ClinicAppointmentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/byReceptionist")
    public ResponseEntity<?> createAppointmentByReceptionist(@RequestBody AppointmentByReceptionistDto dto) {
        try {
            appointmentService.createAppointmentByReceptionist(dto);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/changeAttended/{id}")
    public ResponseEntity<?> changeAttended(@PathVariable Long id, @RequestBody ChangeAttendedDto attended) {
        try {
            appointmentService.changeAttended(id, attended.isAttended());
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (ClinicAppointmentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/nextAppointment/{id}")
    public ResponseEntity<?> nextAppointment(@PathVariable Long id){
        try {
            AppointmentDto next =  appointmentService.nexAppointment(id);
            System.out.println("============NEXT=============");
            System.out.println(next);
            return new ResponseEntity<>(next,HttpStatus.CREATED);
        } catch (ClinicAppointmentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
