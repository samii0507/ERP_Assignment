package com.unicoursemng.unicourse_app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.unicoursemng.unicourse_app.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
}
