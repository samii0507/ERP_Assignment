package com.unicoursemng.unicourse_app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.unicoursemng.unicourse_app.entity.Enrollment;
import com.unicoursemng.unicourse_app.service.EnrollmentService;

@RestController
@RequestMapping("/enrollments")
public class EnrollmentController {

    @Autowired
    private EnrollmentService enrollmentService;

    // DTO for requests
    public static class EnrollRequest {
        public Long studentId;
        public Long courseId;
    }

    @PostMapping
    public ResponseEntity<?> enroll(@RequestBody EnrollRequest request) {
        try {
            Enrollment enrollment = enrollmentService.enrollStudent(request.studentId, request.courseId);
            return ResponseEntity.ok(enrollment);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<?> getEnrollmentsByStudent(@PathVariable Long studentId) {
        try {
            List<Enrollment> enrollments = enrollmentService.getEnrollmentsByStudent(studentId);
            return ResponseEntity.ok(enrollments);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<?> getEnrollmentsByCourse(@PathVariable Long courseId) {
        try {
            List<Enrollment> enrollments = enrollmentService.getEnrollmentsByCourse(courseId);
            return ResponseEntity.ok(enrollments);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
