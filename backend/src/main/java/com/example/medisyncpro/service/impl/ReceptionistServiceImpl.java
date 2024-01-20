package com.example.medisyncpro.service.impl;

import com.example.medisyncpro.dto.CreateReceptionistDto;
import com.example.medisyncpro.mapper.ReceptionistMapper;
import com.example.medisyncpro.model.Receptionist;
import com.example.medisyncpro.repository.ReceptionistRepository;
import com.example.medisyncpro.service.ReceptionistService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReceptionistServiceImpl implements ReceptionistService {


    private final ReceptionistRepository receptionistRepository;
    private final ReceptionistMapper receptionistMapper;

    @Override
    public Receptionist getById(Long id) {
        return receptionistRepository.findById(id).orElse(null);
    }

    @Override
    public List<Receptionist> getAll() {
        return receptionistRepository.findAll();
    }

    @Override
    public Receptionist save(CreateReceptionistDto dto) {
        return receptionistRepository.save(receptionistMapper.createReceptionist(dto));
    }

    @Override
    public Receptionist update(Receptionist receptionist) {
        Receptionist r = this.getById(receptionist.getReceptionistId());
        r.setReceptionistName(receptionist.getReceptionistName());
        r.setEmailAddress(receptionist.getEmailAddress());
        r.setClinicId(receptionist.getClinicId());

        return receptionistRepository.save(r);
    }

    @Override
    public void delete(Long id) {
        receptionistRepository.deleteById(id);
    }
}
