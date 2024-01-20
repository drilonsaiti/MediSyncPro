package com.example.medisyncpro.web;

import com.example.medisyncpro.model.Doctor;
import com.example.medisyncpro.service.DoctorService;
import com.example.medisyncpro.service.SpecializationService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@AllArgsConstructor
@RequestMapping("/doctors")
public class DoctorController {

    private final DoctorService doctorService;
    private final SpecializationService specializationService;



    @GetMapping
    public String listDoctors(Model model) {

        model.addAttribute("doctors", doctorService.getAll());
        return "doctors";
    }

    @GetMapping("/add")
    public String showAddDoctorForm(Model model) {

        model.addAttribute("specializations", specializationService.getAll());
        model.addAttribute("doctor", new Doctor()); // For the form
        return "add-doctor";
    }

    @PostMapping("/save")
    public String saveDoctor(@ModelAttribute Doctor doctor) {
        doctorService.save(doctor);
        return "redirect:/doctors";
    }



}

