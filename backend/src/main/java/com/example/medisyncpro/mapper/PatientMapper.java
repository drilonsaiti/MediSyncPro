package com.example.medisyncpro.mapper;

import com.example.medisyncpro.dto.CreatePatientDto;
import com.example.medisyncpro.model.Patient;
import org.springframework.stereotype.Service;

@Service
public class PatientMapper {

    public Patient createPatient(CreatePatientDto dto){
        return new Patient(dto.getPatientName(), dto.getGender(), dto.getAddress(),
                dto.getContactNumber(), dto.getEmail(), dto.getAge());
    }

    public Patient updatePatient(Patient old,Patient newP){
        old.setPatientName(newP.getPatientName());
        old.setGender(newP.getGender());
        old.setAddress(newP.getAddress());
        old.setContactNumber(newP.getContactNumber());
        old.setEmail(newP.getEmail());
        old.setAge(newP.getAge());

        return old;
    }
}
