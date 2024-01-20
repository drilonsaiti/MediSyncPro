package com.example.medisyncpro.web;

import com.example.medisyncpro.model.ClinicSchedule;
import com.example.medisyncpro.service.ClinicScheduleService;
import com.example.medisyncpro.service.ClinicService;
import com.example.medisyncpro.service.DoctorService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


@Controller
@AllArgsConstructor
@RequestMapping("/clinicSchedules")
public class ClinicScheduleController {

    private final ClinicScheduleService clinicScheduleService;
    private final DoctorService doctorService;
    private final ClinicService clinicService;


    @GetMapping
    public String listClinicSchedules(Model model) {
        // Retrieve the list of clinic schedules from the service
        model.addAttribute("clinicSchedules", clinicScheduleService.getAll());
        return "clinic-schedules"; // Thymeleaf template name
    }

    @GetMapping("/add")
    public String showAddClinicScheduleForm(Model model) {

        model.addAttribute("doctors", doctorService.getAll());
        model.addAttribute("clinics", clinicService.getAll());
        model.addAttribute("clinicSchedule", new ClinicSchedule());
        return "add-clinic-schedules";
    }

    @PostMapping("/save")
    public String saveClinicSchedule(@ModelAttribute ClinicSchedule clinicSchedule) {

        clinicScheduleService.save(clinicSchedule);
        return "redirect:/clinicSchedules";
    }


}
