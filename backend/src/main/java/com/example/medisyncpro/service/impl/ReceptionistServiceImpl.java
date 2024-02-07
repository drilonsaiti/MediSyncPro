package com.example.medisyncpro.service.impl;

import com.example.medisyncpro.model.Clinic;
import com.example.medisyncpro.model.Doctor;
import com.example.medisyncpro.model.Receptionist;
import com.example.medisyncpro.model.dto.*;
import com.example.medisyncpro.model.excp.ClinicException;
import com.example.medisyncpro.model.excp.DoctorException;
import com.example.medisyncpro.model.excp.ReceptionistException;
import com.example.medisyncpro.model.mapper.ReceptionistMapper;
import com.example.medisyncpro.repository.ClinicRepository;
import com.example.medisyncpro.repository.ReceptionistRepository;
import com.example.medisyncpro.service.ReceptionistService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ReceptionistServiceImpl implements ReceptionistService {

    private final ReceptionistRepository receptionistRepository;
    private final ReceptionistMapper receptionistMapper;
    private final ClinicRepository clinicRepository;

    @Override
    public Receptionist getById(Long id) {
        return receptionistRepository.findById(id)
                .orElseThrow(() -> new ReceptionistException(String.format("Receptionist with id: %d, not found", id)));
    }

    @Override
    public ReceptionistDto getByIdDto(Long id) {
        return receptionistRepository.findById(id).map(receptionist -> {
            Clinic clinic = clinicRepository.findByClinicId(receptionist.getClinicId()).orElseThrow(() -> new ClinicException(String.format("Clinic with id: %d not found",receptionist.getClinicId())));
            String clinicName = clinic != null ? clinic.getClinicName() : "Unemployed";
            return receptionistMapper.getReceptionistById(receptionist, clinicName);
        }).orElse(null);
    }

    @Override
    public List<Receptionist> getAll() {
        try {
            return receptionistRepository.findAll();
        } catch (Exception e) {
            throw new ReceptionistException("Error retrieving all receptionists,try again");
        }
    }

    @Override
    public List<Receptionist> getAllByClinicId(Long clinicId) {
        try {
            return receptionistRepository.findAll().stream()
                    .filter(r -> r.getClinicId() != null)
                    .filter(r -> Objects.equals(r.getClinicId(), clinicId)).toList();
        } catch (Exception e) {
            throw new ReceptionistException("Error retrieving all receptionists,try again");
        }
    }

    @Override
    public List<SearchReceptionistDto> getAllReceptionistSearch(Long clinicId) {
        try {
            return receptionistRepository.findAll().stream()
                    .filter(r -> !Objects.equals(r.getClinicId(), clinicId))
                    .map(r -> new SearchReceptionistDto(r.getEmailAddress(),r.getReceptionistName())).toList();
        } catch (Exception e) {
            throw new ReceptionistException("Error retrieving all receptionists,try again");
        }
    }

    @Override
    public Receptionist save(CreateReceptionistDto dto) {
        try {
            return receptionistRepository.save(receptionistMapper.createReceptionist(dto));
        } catch (Exception e) {
            throw new ReceptionistException("Error saving receptionist");
        }
    }

    @Override
    public Receptionist update(Receptionist receptionist) {
        try {
            Receptionist r = this.receptionistRepository.findByReceptionistId(receptionist.getReceptionistId())
                    .orElseThrow(() ->new ReceptionistException(String.format("Receptionist with id: %d, not founded",receptionist.getReceptionistId())));
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
            throw new ReceptionistException("Error deleting receptionist");
        }
    }

    @Override
    public void deleteReceptionistFromClinic(Long id) {
        try {
            Receptionist receptionist = this.receptionistRepository.findByReceptionistId(id).orElseThrow(() ->new ReceptionistException(String.format("Receptionist with id: %d, not founded",id)));
            receptionist.setClinicId(null);
            receptionistRepository.save(receptionist);
        } catch (Exception e) {
            throw new ReceptionistException("Error deleting receptionist from clinic", e);
        }
    }


    @Override
    public void addReceptionistToClinic(List<AddReceptionistToClinicDto> dto, Long clinicId) {
        try {

            for (AddReceptionistToClinicDto add : dto) {
                Receptionist receptionist = receptionistRepository.findByEmailAddress(add.getEmail())
                        .orElseThrow(() -> new ReceptionistException(String.format("Doctor with email: %s not found",add.getEmail())));
                Clinic clinic = clinicRepository.findByClinicId(clinicId).orElseThrow(() -> new ClinicException(String.format("Clinic with id: %d not found",clinicId)));


                receptionist.setClinicId(clinic.getClinicId());
                receptionistRepository.save(receptionist);

            }

        }catch (Exception e) {
            throw new ReceptionistException("Error adding doctor to clinic: " + e.getMessage());
        }
    }
}
