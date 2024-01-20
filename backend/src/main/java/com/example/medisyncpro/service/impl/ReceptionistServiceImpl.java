package com.example.medisyncpro.service.impl;

import com.example.medisyncpro.model.Receptionist;
import com.example.medisyncpro.repository.ReceptionistRepository;
import com.example.medisyncpro.service.ReceptionistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ReceptionistServiceImpl implements ReceptionistService {

    @Autowired
    private ReceptionistRepository receptionistRepository;

    @Override
    public Receptionist getById(Long id) {
        return receptionistRepository.findById(id).orElse(null);
    }

    @Override
    public List<Receptionist> getAll() {
        return receptionistRepository.findAll();
    }

    @Override
    public Receptionist save(Receptionist receptionist) {
        return receptionistRepository.save(receptionist);
    }

    @Override
    public void delete(Long id) {
        receptionistRepository.deleteById(id);
    }
}
