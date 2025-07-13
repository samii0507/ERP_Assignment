package com.unicoursemng.unicourse_app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.unicoursemng.unicourse_app.entity.Course;
import com.unicoursemng.unicourse_app.entity.Registration;
import com.unicoursemng.unicourse_app.entity.Student;

public interface RegistrationRepository extends JpaRepository<Registration, Long> {
    List<Registration> findByStudent(Student student);
    List<Registration> findByCourse(Course course);
    Registration findByStudentAndCourse(Student student, Course course);
}
