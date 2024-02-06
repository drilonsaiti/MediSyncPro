package com.example.medisyncpro.service.impl;

import com.example.medisyncpro.model.Clinic;
import com.example.medisyncpro.model.Receptionist;
import com.example.medisyncpro.model.dto.CreateReceptionistDto;
import com.example.medisyncpro.model.dto.ReceptionistDto;
import com.example.medisyncpro.model.excp.ReceptionistException;
import com.example.medisyncpro.model.mapper.ReceptionistMapper;
import com.example.medisyncpro.repository.ClinicRepository;
import com.example.medisyncpro.repository.ReceptionistRepository;
import com.example.medisyncpro.service.ReceptionistService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReceptionistServiceImpl implements ReceptionistService {

    private final ReceptionistRepository receptionistRepository;
    private final ReceptionistMapper receptionistMapper;
    private final ClinicRepository clinicRepository;

    @Override
    public Receptionist getById(Long id) {
        return receptionistRepository.findById(id).orElse(null);
    }

    @Override
    public ReceptionistDto getByIdDto(Long id) {
        return receptionistRepository.findById(id).map(receptionist -> {
            Clinic clinic = clinicRepository.findByClinicId(receptionist.getClinicId()).orElse(null);
            String clinicName = clinic != null ? clinic.getClinicName() : "Unemployed";
            return receptionistMapper.getReceptionistById(receptionist, clinicName);
        }).orElse(null);
    }

    @Override
    public List<Receptionist> getAll() {
        try {
            return receptionistRepository.findAll();
        } catch (Exception e) {
            throw new ReceptionistException("Error retrieving all receptionists", e);
        }
    }

    @Override
    public Receptionist save(CreateReceptionistDto dto) {
        try {
            return receptionistRepository.save(receptionistMapper.createReceptionist(dto));
        } catch (Exception e) {
            throw new ReceptionistException("Error saving receptionist", e);
        }
    }

    @Override
    public Receptionist update(Receptionist receptionist) {
        try {
            Receptionist r = this.getById(receptionist.getReceptionistId());
            r.setReceptionistName(receptionist.getReceptionistName());
            r.setEmailAddress(receptionist.getEmailAddress());
            r.setClinicId(receptionist.getClinicId());
            return receptionistRepository.save(r);
        } catch (Exception e) {
            throw new ReceptionistException("Error updating receptionist", e);
        }
    }

    @Override
    public void delete(Long id) {
        try {
            receptionistRepository.deleteById(id);
        } catch (Exception e) {
            throw new ReceptionistException("Error deleting receptionist", e);
        }
    }

    @Override
    public void deleteReceptionistFromClinic(Long id) {
        try {
            Receptionist receptionist = this.getById(id);
            receptionist.setClinicId(null);
            receptionistRepository.save(receptionist);
        } catch (Exception e) {
            throw new ReceptionistException("Error deleting receptionist from clinic", e);
        }
    }
}
