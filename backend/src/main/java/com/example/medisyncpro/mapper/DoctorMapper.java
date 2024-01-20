package com.example.medisyncpro.mapper;

import com.example.medisyncpro.dto.CreateDoctorDto;
import com.example.medisyncpro.model.Clinic;
import com.example.medisyncpro.model.Doctor;
import com.example.medisyncpro.model.Specializations;
import org.springframework.stereotype.Service;

@Service
public class DoctorMapper {

    public Doctor createDoctor(CreateDoctorDto dto, Specializations specializations, Clinic clinic){
        return new Doctor(
                dto.getDoctorName(),
                specializations,
                dto.getEducation(),
                dto.getWorkingDays(),
                clinic
        );
    }

    public Doctor updateDoctor(Doctor old,Doctor newDoctor){
        old.setDoctorName(newDoctor.getDoctorName());
        old.setSpecialization(newDoctor.getSpecialization());
        old.setEducation(newDoctor.getEducation());
        old.setWorkingDays(newDoctor.getWorkingDays());
        old.setClinic(newDoctor.getClinic());

        return old;
    }
}
