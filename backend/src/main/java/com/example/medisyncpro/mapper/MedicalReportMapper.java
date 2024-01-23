package com.example.medisyncpro.mapper;

import com.example.medisyncpro.dto.CreateMedicalReportDto;
import com.example.medisyncpro.model.Doctor;
import com.example.medisyncpro.model.MedicalReport;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;

@Service
public class MedicalReportMapper {

    public MedicalReport createMedicalReport(CreateMedicalReportDto dto, Doctor doctor){
        return new MedicalReport(
                dto.getPatientId(),
                doctor,
                dto.getMedicineName(),
                dto.getQuantity(),
                dto.getDisease(),
                dto.getAnalyses(),
                dto.getNextAppointmentDate(),
                dto.getNoOfDays(),
                dto.getAppointmentDate()
        );
    }

    public MedicalReport updateMedicalReport(MedicalReport old,MedicalReport newReport){
        old.setMedicineName(newReport.getMedicineName());
        old.setQuantity(newReport.getQuantity());
        old.setDisease(newReport.getDisease());
        old.setAnalyses(newReport.getAnalyses());
        old.setNextAppointmentDate(newReport.getNextAppointmentDate());
        old.setNoOfDays(newReport.getNoOfDays());
        old.setAppointmentDate( LocalDateTime.now());

        return old;
    }
}
