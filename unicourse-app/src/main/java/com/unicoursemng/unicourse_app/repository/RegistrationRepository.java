package com.unicoursemng.unicourse_app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.unicoursemng.unicourse_app.entity.Registration;

public interface RegistrationRepository extends JpaRepository<Registration, Long> {
}
