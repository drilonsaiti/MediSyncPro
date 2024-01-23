package com.example.medisyncpro.web.rest;

import com.example.medisyncpro.model.Doctor;
import com.example.medisyncpro.service.DoctorService;
import com.example.medisyncpro.service.SpecializationService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@AllArgsConstructor
@RequestMapping("/doctore")
public class DoctorController {

    private final DoctorService doctorService;
    private final SpecializationService specializationService;


    @GetMapping
    public String listDoctors(Model model) {

        model.addAttribute("doctors", doctorService.getAll());
        return "doctors";
    }
}