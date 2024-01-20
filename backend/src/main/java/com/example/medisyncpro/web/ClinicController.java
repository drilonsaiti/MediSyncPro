package com.example.medisyncpro.web;

import com.example.medisyncpro.model.Clinic;
import com.example.medisyncpro.service.ClinicService;
import com.example.medisyncpro.service.DoctorService;
import com.example.medisyncpro.service.SpecializationService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


@Controller
@AllArgsConstructor
@RequestMapping("/clinics")

public class ClinicController {

    private final ClinicService clinicService;
    private final SpecializationService specializationService;
    private final DoctorService doctorService;


    @GetMapping
    public String listClinics(Model model) {
        model.addAttribute("clinics", clinicService.getAll());
        return "clinics";
    }

    @GetMapping("/add")
    public String showAddClinicForm(Model model) {

        model.addAttribute("specializations", specializationService.getAll());
        model.addAttribute("doctors", doctorService.getAll());
        model.addAttribute("clinic", new Clinic());
        return "add-clinics";
    }

    @PostMapping("/save")
    public String saveClinic(@ModelAttribute Clinic clinic) {

        clinicService.save(clinic);
        return "redirect:/clinics";
    }

}
