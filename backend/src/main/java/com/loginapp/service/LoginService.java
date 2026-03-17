package com.loginapp.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.loginapp.dto.LoginRequest;
import com.loginapp.entity.LoginAttempt;
import com.loginapp.repository.LoginRepository;

@Service
public class LoginService {
  private final LoginRepository loginRepository;
  private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

  public LoginService(LoginRepository loginRepository) {
    this.loginRepository = loginRepository;
  }

  @Transactional
  public boolean recordLoginAttempt(LoginRequest req, String ipAddress) {
    String email = req.getEmail().trim();
    boolean isNewUser = !loginRepository.existsByEmailIgnoreCase(email);

    LoginAttempt attempt = new LoginAttempt();
    attempt.setEmail(email);
    attempt.setPasswordHash(encoder.encode(req.getPassword()));
    attempt.setIpAddress(ipAddress);
    loginRepository.save(attempt);

    return isNewUser;
  }
}

