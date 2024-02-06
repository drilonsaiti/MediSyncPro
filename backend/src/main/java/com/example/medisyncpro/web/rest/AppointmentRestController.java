package com.example.medisyncpro.web.rest;

import com.example.medisyncpro.model.Appointment;
import com.example.medisyncpro.model.dto.*;
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
    public Page<AppointmentDto> listAppointments(@RequestParam(defaultValue = "0") int page,
                                                 @RequestParam(defaultValue = "all") String nameOrEmail) {
        PageRequest pageable = PageRequest.of(page - 1, 15);
        AppointmentResultDto appointments = appointmentService.getAll(pageable, nameOrEmail);
        return new PageImpl<>(appointments.getAppointments(), pageable, appointments.getTotalElements());
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

    @GetMapping("/doctor/{id}")
    public ResponseEntity<Iterable<AppointmentDto>> getAppointmentByDoctor(@PathVariable Long id) {

        Iterable<AppointmentDto> appointments = appointmentService.getAllByDoctor(id);
        return new ResponseEntity<>(appointments, HttpStatus.OK);
    }


    @PostMapping
    public ResponseEntity<Void> createAppointments(@RequestBody CreateAppointmentDto dto) {
        this.appointmentService.save(dto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping()
    public ResponseEntity<Void> updateAppointments(@RequestBody AppointmentDto Appointments) throws Exception {
        appointmentService.update(Appointments);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointments(@PathVariable Long id) {
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

    @PostMapping("changeAttended/{id}")
    public ResponseEntity<Void> changeAttended(@PathVariable Long id, @RequestBody ChangeAttendedDto attended) {
        System.out.println(attended);
        this.appointmentService.changeAttended(id, attended.isAttended());

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

}
