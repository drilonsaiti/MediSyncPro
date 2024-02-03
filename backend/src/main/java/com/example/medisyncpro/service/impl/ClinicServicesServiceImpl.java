package com.example.medisyncpro.service.impl;

import com.example.medisyncpro.model.dto.ClinicServicesResultDto;
import com.example.medisyncpro.model.dto.CreateClinicServicesDto;
import com.example.medisyncpro.model.dto.GroupedClinicSchedule;
import com.example.medisyncpro.model.mapper.ClinicServicesMapper;
import com.example.medisyncpro.model.ClinicServices;
import com.example.medisyncpro.model.Specializations;
import com.example.medisyncpro.repository.ServiceRepository;
import com.example.medisyncpro.repository.SpecializationRepository;
import com.example.medisyncpro.service.ClinicServicesService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Arrays;
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

    private Comparable getFieldValue(
            ClinicServices booking, String field) {
        switch (field) {
            case "id":
                return booking.getServiceId();
            case "name":
                return booking.getServiceName();
            case "price":
                return booking.getPrice();
            case "duration":
                return booking.getDurationMinutes();
            default:
                throw new IllegalArgumentException("Invalid field for sorting: " + field);
        }
    }
    @Override
    public ClinicServicesResultDto getAll(PageRequest pageable, String specialization, String sort) {
        String [] specs = specialization.split(",");
        List<ClinicServices> services = serviceRepository.findAll().stream().filter(service ->
                (specialization.equals("all") || Arrays.asList(specs).contains(service.getSpecializations().getSpecializationName())))
                .sorted((a, b) -> {
                    String[] sortBy = sort.split("-");
                    String field = sortBy[0];
                    String direction = sortBy[1];
                    Comparable fieldA = getFieldValue(a, field);
                    Comparable fieldB = getFieldValue(b, field);

                    return direction.equals("asc") ? fieldA.compareTo(fieldB) : fieldB.compareTo(fieldA);
                }).toList();

        return new ClinicServicesResultDto(services.stream().skip(pageable.getOffset()).limit(pageable.getPageSize()).toList(),services.size());
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

    @Override
    public List<ClinicServices> findAllBySpecializationsId(Long id) {
        return serviceRepository.findAllBySpecializations_SpecializationId(id);
    }
}
