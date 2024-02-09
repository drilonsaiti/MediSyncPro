package com.example.medisyncpro.service;

import com.example.medisyncpro.model.Receptionist;
import com.example.medisyncpro.model.dto.AddReceptionistToClinicDto;
import com.example.medisyncpro.model.dto.CreateReceptionistDto;
import com.example.medisyncpro.model.dto.ReceptionistDto;
import com.example.medisyncpro.model.dto.SearchReceptionistDto;

import java.util.List;

public interface ReceptionistService {

    Receptionist getById(Long id);

    ReceptionistDto getByIdDto(Long id);

    List<Receptionist> getAll();

    List<Receptionist> getAllByClinicId(Long clinicId);

    List<SearchReceptionistDto> getAllReceptionistSearch(Long clinicId);

    void addReceptionistToClinic(List<AddReceptionistToClinicDto> dto, Long clinicId);

    Receptionist save(CreateReceptionistDto dto);

    Receptionist update(Receptionist receptionist);

    void delete(Long id);

    void deleteReceptionistFromClinic(Long id);
}

