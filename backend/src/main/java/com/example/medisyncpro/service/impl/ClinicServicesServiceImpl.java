package com.example.medisyncpro.service.impl;

import com.example.medisyncpro.dto.CreateClinicServicesDto;
import com.example.medisyncpro.mapper.ClinicServicesMapper;
import com.example.medisyncpro.model.ClinicServices;
import com.example.medisyncpro.model.Specializations;
import com.example.medisyncpro.repository.ServiceRepository;
import com.example.medisyncpro.repository.SpecializationRepository;
import com.example.medisyncpro.service.ClinicServicesService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClinicServicesServiceImpl implements ClinicServicesService {


    private final ServiceRepository serviceRepository;
    private final SpecializationRepository specializationRepository;
    private final ClinicServicesMapper servicesMapper;
    @Override
    public ClinicServices getById(Long id) {
        return serviceRepository.findById(id).orElse(null);
    }

    @Override
    public List<ClinicServices> getAll() {
        return serviceRepository.findAll();
    }

    @Override
    public ClinicServices save(CreateClinicServicesDto clinicServices) {
        Specializations specializations = specializationRepository.getById(clinicServices.getSpecializationsId());
        return serviceRepository.save(servicesMapper.createClinicServices(clinicServices,specializations));
    }

    @Override
    public ClinicServices update(ClinicServices clinicServices) {
        ClinicServices old = this.getById(clinicServices.getServiceId());
        return serviceRepository.save(servicesMapper.updateClinicServices(old,clinicServices));
    }

    @Override
    public void delete(Long id) {
        serviceRepository.deleteById(id);
    }
}
