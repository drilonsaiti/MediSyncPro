package com.example.medisyncpro.web.rest;

import com.example.medisyncpro.model.dto.CreateSpecializationDto;
import com.example.medisyncpro.model.Specializations;
import com.example.medisyncpro.service.SpecializationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/specializations")
@CrossOrigin
public class SpecializationRestController {

    private final SpecializationService specializationService;

    @GetMapping
    public ResponseEntity<Iterable<Specializations>> listSpecializations() {
        Iterable<Specializations> specializations = specializationService.getAll();
        return new ResponseEntity<>(specializations, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Specializations> getSpecializationById(@PathVariable Long id) {

        return new ResponseEntity<>(specializationService.getById(id), HttpStatus.OK);
    }


    @PostMapping
    public ResponseEntity<Void> createSpecialization(@RequestBody CreateSpecializationDto dto) {
        this.specializationService.save(dto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Void> updateSpecialization(@RequestBody Specializations specializations) {
        System.out.println("ITS CALLED");
        specializationService.update(specializations);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSpecialization(@PathVariable Long id){
        specializationService.delete(id);

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

}
