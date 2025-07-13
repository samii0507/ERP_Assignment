package com.unicoursemng.unicourse_app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.unicoursemng.unicourse_app.entity.Course;
import com.unicoursemng.unicourse_app.entity.Registration;
import com.unicoursemng.unicourse_app.entity.Student;
import com.unicoursemng.unicourse_app.repository.CourseRepository;
import com.unicoursemng.unicourse_app.repository.StudentRepository;
import com.unicoursemng.unicourse_app.service.RegistrationService;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/registrations")
public class RegistrationController {
    @Autowired
    private RegistrationService registrationService;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private CourseRepository courseRepository;

    @PostMapping
    public ResponseEntity<?> registerCourse(@RequestParam Long studentId, @RequestParam Long courseId) {
        Student student = studentRepository.findById(studentId).orElse(null);
        Course course = courseRepository.findById(courseId).orElse(null);
        if (student == null || course == null) {
            return ResponseEntity.badRequest().body("Student or course not found");
        }
        try {
            Registration reg = registrationService.registerCourse(student, course);
            return ResponseEntity.ok(reg);
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
}
