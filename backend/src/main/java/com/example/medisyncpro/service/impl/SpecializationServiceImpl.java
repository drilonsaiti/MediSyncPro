package com.example.medisyncpro.service.impl;

import com.example.medisyncpro.model.Specializations;
import com.example.medisyncpro.model.dto.CreateSpecializationDto;
import com.example.medisyncpro.model.excp.SpecializationException;
import com.example.medisyncpro.model.mapper.SpecializationMapper;
import com.example.medisyncpro.repository.SpecializationRepository;
import com.example.medisyncpro.service.SpecializationService;
import lombok.RequiredArgsConstructor;
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
        try {
            return specializationRepository.save(specializationMapper.createSpecialization(dto));
        } catch (Exception e) {
            throw new SpecializationException("Error saving specialization", e);
        }
    }

    @Override
    public Specializations update(Specializations specializations) {
        try {
            Specializations s = this.getById(specializations.getSpecializationId());
            s.setSpecializationName(specializations.getSpecializationName());
            return specializationRepository.save(s);
        } catch (Exception e) {
            throw new SpecializationException("Error updating specialization", e);
        }
    }

    @Override
    public void delete(Long id) {
        try {
            specializationRepository.deleteById(id);
        } catch (Exception e) {
            throw new SpecializationException("Error deleting specialization", e);
        }
    }
}
