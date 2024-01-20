package com.example.medisyncpro.web;

import com.example.medisyncpro.model.MedicalReport;
import com.example.medisyncpro.service.DoctorService;
import com.example.medisyncpro.service.MedicalReportService;
import com.example.medisyncpro.service.PatientService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@AllArgsConstructor
@RequestMapping("/medicalReports")
public class MedicalReportController {

    private final MedicalReportService medicalReportService;
    private final PatientService patientService;
    private final DoctorService doctorService;


    @GetMapping
    public String listMedicalReports(Model model) {

        model.addAttribute("medicalReports", medicalReportService.getAll());
        return "medical-reports";
    }

    @GetMapping("/add")
    public String showAddMedicalReportForm(Model model) {

        model.addAttribute("patients", patientService.getAll());
        model.addAttribute("doctors", doctorService.getAll());
        model.addAttribute("medicalReport", new MedicalReport());
        return "add-medical-reports";
    }

    @PostMapping("/save")
    public String saveMedicalReport(@ModelAttribute MedicalReport medicalReport) {

        medicalReportService.save(medicalReport);
        return "redirect:/medicalReports";
    }

    // Add methods for editing, deleting, and other operations

}
