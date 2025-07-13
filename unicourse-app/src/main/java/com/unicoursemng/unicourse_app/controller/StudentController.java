package com.unicoursemng.unicourse_app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.unicoursemng.unicourse_app.entity.Student;
import com.unicoursemng.unicourse_app.service.StudentService;

@RestController
@RequestMapping("/students")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Student student) {
        try {
            return ResponseEntity.ok(studentService.registerStudent(student));
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Student login) {
        try {
            Student student = studentService.login(login.getEmail(), login.getPassword());
            return ResponseEntity.ok(student);
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
}
