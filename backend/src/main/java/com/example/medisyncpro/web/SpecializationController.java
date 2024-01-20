package com.example.medisyncpro.web;

import com.example.medisyncpro.model.Specializations;
import com.example.medisyncpro.service.SpecializationService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


@Controller
@AllArgsConstructor
@RequestMapping("/specializations")
public class SpecializationController {

    private final SpecializationService specializationService;


    @GetMapping
    public String listSpecializations(Model model) {

        model.addAttribute("specializations", specializationService.getAll());
        return "specializations"; // Thymeleaf template name
    }

    @GetMapping("/add")
    public String showAddSpecializationForm(Model model) {

        model.addAttribute("specialization", new Specializations());
        return "add-specialization";
    }

    @PostMapping("/save")
    public String saveSpecialization(@ModelAttribute Specializations specializations) {

        specializationService.save(specializations);
        return "redirect:/specializations";
    }


}

