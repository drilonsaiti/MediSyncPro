package com.example.medisyncpro.model.enums;

import org.springframework.security.core.GrantedAuthority;


public enum Role implements GrantedAuthority {

    ROLE_USER, ROLE_ADMIN,ROLE_RECEPTIONIST,ROLE_OWNER;

    @Override
    public String getAuthority() {
        return name();
    }
}
