package com.loginapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.loginapp.entity.LoginAttempt;

@Repository
public interface LoginRepository extends JpaRepository<LoginAttempt, Long> {
  boolean existsByEmailIgnoreCase(String email);
}

