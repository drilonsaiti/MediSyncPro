/*
package com.example.medisyncpro.service.impl;

import com.example.medisyncpro.model.User;
import com.example.medisyncpro.model.enums.Role;
import com.example.medisyncpro.repository.UserRepository;
import com.example.medisyncpro.service.UserService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        return userRepository.findByEmail(s).orElseThrow(()->new UsernameNotFoundException(s));
    }

    @Override
    public User register(String email, String password, String repeatPassword, String name, String surname, Role role) {
        return null;
    }


}

*/
