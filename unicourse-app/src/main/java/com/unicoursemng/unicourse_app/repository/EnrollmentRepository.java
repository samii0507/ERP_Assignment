package com.unicoursemng.unicourse_app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.unicoursemng.unicourse_app.entity.Course;
import com.unicoursemng.unicourse_app.entity.Enrollment;
import com.unicoursemng.unicourse_app.entity.Student;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<Enrollment> findByStudent(Student student);
    List<Enrollment> findByCourse(Course course);
    Optional<Enrollment> findByStudentAndCourse(Student student, Course course);
}
