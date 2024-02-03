package com.example.medisyncpro.web.rest;


import com.example.medisyncpro.model.dto.CreateReceptionistDto;
import com.example.medisyncpro.model.Receptionist;
import com.example.medisyncpro.model.dto.ReceptionistDto;
import com.example.medisyncpro.service.DoctorService;
import com.example.medisyncpro.service.ClinicService;
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
    public ResponseEntity<Iterable<Receptionist>> listReceptionists() {
        Iterable<Receptionist> receptionists = receptionistService.getAll();
        return new ResponseEntity<>(receptionists, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReceptionistDto> getReceptionistById(@PathVariable Long id) {

        return new ResponseEntity<>(receptionistService.getByIdDto(id), HttpStatus.OK);
    }


    @PostMapping
    public ResponseEntity<Void> createReceptionist(@RequestBody CreateReceptionistDto dto) {
        this.receptionistService.save(dto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping()
    public ResponseEntity<Void> updateReceptionist(@RequestBody Receptionist receptionist) {
        receptionistService.update(receptionist);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReceptionist(@PathVariable Long id){
        receptionistService.delete(id);

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

}
