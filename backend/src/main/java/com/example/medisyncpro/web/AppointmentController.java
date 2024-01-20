package com.example.medisyncpro.web;

import com.example.medisyncpro.model.Appointment;
import com.example.medisyncpro.service.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@AllArgsConstructor
@RequestMapping("/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;
    private final PatientService patientService;
    private final DoctorService doctorService;
    private final ClinicService clinicService;
    private final ServiceService serviceService;


    @GetMapping
    public String listAppointments(Model model) {

        model.addAttribute("appointments", appointmentService.getAll());
        return "appointments"; // Thymeleaf template name
    }

    @GetMapping("/add")
    public String showAddAppointmentForm(Model model) {

        model.addAttribute("patients", patientService.getAll());
        model.addAttribute("doctors", doctorService.getAll());
        model.addAttribute("clinics", clinicService.getAll());
        model.addAttribute("services", serviceService.getAll());
        model.addAttribute("appointment", new Appointment());
        return "add-appointments";
    }

    @PostMapping("/save")
    public String saveAppointment(@ModelAttribute Appointment appointment) {

        appointmentService.save(appointment);
        return "redirect:/appointments";
    }
}
