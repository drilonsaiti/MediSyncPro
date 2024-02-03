package com.example.medisyncpro.web.rest;



import com.example.medisyncpro.model.dto.ClinicScheduleDto;
import com.example.medisyncpro.model.dto.ClinicScheduleResultDto;
import com.example.medisyncpro.model.dto.CreateClinicSchedulesDto;
import com.example.medisyncpro.model.ClinicSchedule;
import com.example.medisyncpro.model.dto.GroupedClinicSchedule;
import com.example.medisyncpro.service.ClinicScheduleService;
import com.example.medisyncpro.service.DoctorService;
import com.example.medisyncpro.service.SettingsService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api/clinicSchedules")
@CrossOrigin
public class ClinicScheduleRestController {

    private final ClinicScheduleService clinicScheduleService;
    private final DoctorService doctorService;
    private final SettingsService service;

    @GetMapping
    public ResponseEntity<List<ClinicSchedule>> listClinicSchedules() {
        return new ResponseEntity<>(clinicScheduleService.getAll(), HttpStatus.OK);
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

    @PostMapping("/generate/{id}")
    public ResponseEntity<Iterable<ClinicSchedule>> generateClinicSchedules(@PathVariable Long id) {
        Iterable<ClinicSchedule> clinicSchedules = clinicScheduleService.generateSchedules(id);
        return new ResponseEntity<>(clinicSchedules, HttpStatus.OK);
    }

    @GetMapping("/grouped/{id}")
    public Page<GroupedClinicSchedule> getAllByClinicGroupedByDate(@PathVariable Long id,
                                                                   @RequestParam(defaultValue = "1") int page,
                                                                   @RequestParam(defaultValue = "startDate-asc") String sort){
        PageRequest pageable = PageRequest.of(page - 1, 15);
        ClinicScheduleResultDto results = clinicScheduleService.getAllByClinicGroupedByDate(id,pageable,sort);
        return new PageImpl<>(results.getClinicSchedule(),pageable,results.getTotalElements());
    }

}
