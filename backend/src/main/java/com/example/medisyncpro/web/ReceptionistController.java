package com.example.medisyncpro.web;

import com.example.medisyncpro.model.Receptionist;
import com.example.medisyncpro.service.ClinicService;
import com.example.medisyncpro.service.DoctorService;
import com.example.medisyncpro.service.ReceptionistService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@AllArgsConstructor
@RequestMapping("/receptionists")
public class ReceptionistController {

    private final ReceptionistService receptionistService;
    private final DoctorService doctorService;
    private final ClinicService clinicService;


    @GetMapping
    public String listReceptionists(Model model) {

        model.addAttribute("receptionists", receptionistService.getAll());
        return "receptionists"; // Thymeleaf template name
    }

    @GetMapping("/add")
    public String showAddReceptionistForm(Model model) {

        model.addAttribute("doctors", doctorService.getAll());
        model.addAttribute("clinics", clinicService.getAll());
        model.addAttribute("receptionist", new Receptionist());
        return "add-receptionists";
    }

    @PostMapping("/save")
    public String saveReceptionist(@ModelAttribute Receptionist receptionist) {

        receptionistService.save(receptionist);
        return "redirect:/receptionists";
    }


}
