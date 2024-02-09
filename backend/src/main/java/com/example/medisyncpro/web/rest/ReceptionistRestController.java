package com.example.medisyncpro.web.rest;


import com.example.medisyncpro.model.Receptionist;
import com.example.medisyncpro.model.dto.CreateReceptionistDto;
import com.example.medisyncpro.model.dto.SearchReceptionistDto;
import com.example.medisyncpro.model.excp.ReceptionistException;
import com.example.medisyncpro.service.ClinicService;
import com.example.medisyncpro.service.DoctorService;
import com.example.medisyncpro.service.ReceptionistService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/receptionists")
@CrossOrigin
public class ReceptionistRestController {

    private final ReceptionistService receptionistService;
    private final DoctorService doctorService;
    private final ClinicService clinicService;

    @GetMapping
    public ResponseEntity<?> listReceptionists() {
        Iterable<Receptionist> receptionists = receptionistService.getAll();
        return new ResponseEntity<>(receptionists, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getReceptionistById(@PathVariable Long id) {
        try {
            return new ResponseEntity<>(receptionistService.getByIdDto(id), HttpStatus.OK);
        } catch (ReceptionistException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/clinic/{clinicId}")
    public ResponseEntity<?> listDoctors(@PathVariable Long clinicId) {
        try {
            Iterable<Receptionist> receptionists = receptionistService.getAllByClinicId(clinicId);
            return new ResponseEntity<>(receptionists, HttpStatus.OK);
        } catch (ReceptionistException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/search/{clinicId}")
    public ResponseEntity<?> listReceptionistsForSearch(@PathVariable Long clinicId) {
        try {
            Iterable<SearchReceptionistDto> receptionists = receptionistService.getAllReceptionistSearch(clinicId);
            return new ResponseEntity<>(receptionists, HttpStatus.OK);
        } catch (ReceptionistException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping
    public ResponseEntity<?> createReceptionist(@RequestBody CreateReceptionistDto dto) {
        try {
            this.receptionistService.save(dto);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (ReceptionistException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping()
    public ResponseEntity<?> updateReceptionist(@RequestBody Receptionist receptionist) {
        try {
            receptionistService.update(receptionist);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (ReceptionistException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReceptionist(@PathVariable Long id) {
        try {
            receptionistService.delete(id);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        } catch (ReceptionistException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/clinic/{id}")
    public ResponseEntity<?> deleteReceptionistFromClinic(@PathVariable Long id) {
        try {
            receptionistService.deleteReceptionistFromClinic(id);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        } catch (ReceptionistException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
