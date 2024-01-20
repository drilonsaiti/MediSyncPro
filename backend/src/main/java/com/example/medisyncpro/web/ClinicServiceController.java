package com.example.medisyncpro.web;
import com.example.medisyncpro.model.ClinicServices;
import com.example.medisyncpro.service.ServiceService;
import com.example.medisyncpro.service.SpecializationService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


@Controller
@AllArgsConstructor
@RequestMapping("/clinic-services")
public class ClinicServiceController {

    private final ServiceService serviceService;
    private final SpecializationService specializationService;

    @GetMapping
    public String listServices(Model model) {

        model.addAttribute("services", serviceService.getAll());
        return "clinic-services"; // Thymeleaf template name
    }

    @GetMapping("/add")
    public String showAddServiceForm(Model model) {

        model.addAttribute("specializations", specializationService.getAll());
        model.addAttribute("service", new ClinicServices()); // For the form
        return "add-services";
    }

    @PostMapping("/save")
    public String saveService(@ModelAttribute ClinicServices service) {

        serviceService.save(service);
        return "redirect:/services";
    }

}
