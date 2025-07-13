package com.unicoursemng.unicourse_app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.unicoursemng.unicourse_app.entity.Course;
import com.unicoursemng.unicourse_app.entity.Enrollment;
import com.unicoursemng.unicourse_app.entity.Student;
import com.unicoursemng.unicourse_app.repository.CourseRepository;
import com.unicoursemng.unicourse_app.repository.EnrollmentRepository;
import com.unicoursemng.unicourse_app.repository.StudentRepository;

@Service
public class EnrollmentService {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CourseRepository courseRepository;

    public Enrollment enrollStudent(Long studentId, Long courseId) throws Exception {
        Student student = studentRepository.findById(studentId)
            .orElseThrow(() -> new Exception("Student not found"));
        Course course = courseRepository.findById(courseId)
            .orElseThrow(() -> new Exception("Course not found"));

        // Check if already enrolled
        if (enrollmentRepository.findByStudentAndCourse(student, course).isPresent()) {
            throw new Exception("Student already enrolled in this course");
        }

        Enrollment enrollment = new Enrollment(student, course);
        return enrollmentRepository.save(enrollment);
    }

    public List<Enrollment> getEnrollmentsByStudent(Long studentId) throws Exception {
        Student student = studentRepository.findById(studentId)
            .orElseThrow(() -> new Exception("Student not found"));
        return enrollmentRepository.findByStudent(student);
    }

    public List<Enrollment> getEnrollmentsByCourse(Long courseId) throws Exception {
        Course course = courseRepository.findById(courseId)
            .orElseThrow(() -> new Exception("Course not found"));
        return enrollmentRepository.findByCourse(course);
    }
}
