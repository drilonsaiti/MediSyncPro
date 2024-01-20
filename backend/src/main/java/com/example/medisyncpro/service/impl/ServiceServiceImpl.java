package com.example.medisyncpro.service.impl;

import com.example.medisyncpro.model.ClinicServices;
import com.example.medisyncpro.repository.ServiceRepository;
import com.example.medisyncpro.service.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceServiceImpl implements ServiceService {

    @Autowired
    private ServiceRepository serviceRepository;

    @Override
    public ClinicServices getById(Long id) {
        return serviceRepository.findById(id).orElse(null);
    }

    @Override
    public List<ClinicServices> getAll() {
        return serviceRepository.findAll();
    }

    @Override
    public ClinicServices save(ClinicServices clinicServices) {
        return serviceRepository.save(clinicServices);
    }

    @Override
    public void delete(Long id) {
        serviceRepository.deleteById(id);
    }
}
