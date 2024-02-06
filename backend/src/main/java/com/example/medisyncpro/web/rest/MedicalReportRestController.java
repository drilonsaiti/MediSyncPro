package com.example.medisyncpro.web.rest;


import com.example.medisyncpro.model.MedicalReport;
import com.example.medisyncpro.model.dto.CreateMedicalReportDto;
import com.example.medisyncpro.model.dto.MedicalReportDto;
import com.example.medisyncpro.model.dto.MedicalReportResultDto;
import com.example.medisyncpro.service.MedicalReportService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/medicalReports")
@CrossOrigin
public class MedicalReportRestController {

    private final MedicalReportService medicalReportService;

    @GetMapping
    public Page<MedicalReportDto> listMedicalReports(@RequestParam(defaultValue = "0") int page,
                                                     @RequestParam(defaultValue = "all") String nameOrEmail,
                                                     @RequestParam(defaultValue = "all") String byDate
    ) {

        PageRequest pageable = PageRequest.of(page - 1, 15);
        MedicalReportResultDto report = medicalReportService.getAll(pageable, nameOrEmail, byDate);

        return new PageImpl<>(report.getMedicalReport(), pageable, report.getTotalElements());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicalReportDto> getMedicalReportById(@PathVariable Long id) {

        return new ResponseEntity<>(medicalReportService.getById(id), HttpStatus.OK);
    }


    @PostMapping
    public ResponseEntity<Void> createMedicalReport(@RequestBody CreateMedicalReportDto dto) {
        this.medicalReportService.save(dto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping()
    public ResponseEntity<Void> updateMedicalReport(@RequestBody MedicalReport patient) {
        medicalReportService.update(patient);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedicalReport(@PathVariable Long id) {
        medicalReportService.delete(id);

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

}
