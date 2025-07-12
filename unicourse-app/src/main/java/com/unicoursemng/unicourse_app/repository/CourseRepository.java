package com.unicoursemng.unicourse_app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.unicoursemng.unicourse_app.entity.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {
}
