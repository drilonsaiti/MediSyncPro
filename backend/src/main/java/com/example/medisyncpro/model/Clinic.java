package com.example.medisyncpro.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name = "CLINIC")
@NoArgsConstructor

public class Clinic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "clinic_id")
    private Long clinicId;

    @Column(name = "clinic_name", nullable = false)
    private String clinicName;

    @Column(name = "address", nullable = false)
    private String address;

    @OneToMany
    private Set<Specializations> specializations;

    @OneToMany(mappedBy = "clinic")
    @JsonIgnore
    private List<Doctor> doctors;

    @OneToOne
    @JoinColumn(name = "settings_id")
    private Settings settings;

    public Clinic(String clinicName, String address) {
        this.clinicName = clinicName;
        this.address = address;
        this.specializations = new HashSet<>();
        this.doctors = new ArrayList<>();
    }
}

