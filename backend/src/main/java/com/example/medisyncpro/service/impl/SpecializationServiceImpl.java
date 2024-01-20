package com.example.medisyncpro.service.impl;

import com.example.medisyncpro.dto.CreateSpecializationDto;
import com.example.medisyncpro.mapper.SpecializationMapper;
import com.example.medisyncpro.model.Specializations;
import com.example.medisyncpro.repository.SpecializationRepository;
import com.example.medisyncpro.service.SpecializationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SpecializationServiceImpl implements SpecializationService {


    private final SpecializationRepository specializationRepository;
    private final SpecializationMapper specializationMapper;

    @Override
    public Specializations getById(Long id) {
        return specializationRepository.findById(id).orElse(null);
    }

    @Override
    public List<Specializations> getAll() {
        return specializationRepository.findAll();
    }

    @Override
    public Specializations save(CreateSpecializationDto dto) {
        return specializationRepository.save(specializationMapper.createSpecialization(dto));
    }

    @Override
    public Specializations update(Specializations specializations) {
        Specializations s = this.getById(specializations.getSpecializationId());
        s.setSpecializationName(specializations.getSpecializationName());

        return specializationRepository.save(s);
    }

    @Override
    public void delete(Long id) {
        specializationRepository.deleteById(id);
    }
}
