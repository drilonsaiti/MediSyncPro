package com.example.medisyncpro.service;

import com.example.medisyncpro.model.Receptionist;

import java.util.List;

public interface ReceptionistService {

    Receptionist getById(Long id);

    List<Receptionist> getAll();

    Receptionist save(Receptionist receptionist);

    void delete(Long id);
}

