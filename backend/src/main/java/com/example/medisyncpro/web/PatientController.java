package com.example.medisyncpro.web;

import com.example.medisyncpro.model.Patient;
import com.example.medisyncpro.service.PatientService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@AllArgsConstructor
@RequestMapping("/patients")
public class PatientController {

    private final PatientService patientService;


    @GetMapping
    public String listPatients(Model model) {
        // Retrieve the list of patients from the service
        model.addAttribute("patients", patientService.getAll());
        return "patients"; // Thymeleaf template name
    }

    @GetMapping("/add")
    public String showAddPatientForm(Model model) {
        // Add an empty patient to the model for the form
        model.addAttribute("patient", new Patient());
        return "add-patient";
    }

    @PostMapping("/save")
    public String savePatient(@ModelAttribute Patient patient) {
        // Save or update the patient using the PatientService
        patientService.save(patient);
        return "redirect:/patients"; // Redirect to the list of patients
    }

    // Add methods for editing, deleting, and other operations

}
