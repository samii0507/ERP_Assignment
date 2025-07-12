package com.unicoursemng.unicourse_app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.unicoursemng.unicourse_app.entity.Result;

public interface ResultRepository extends JpaRepository<Result, Long> {
}
