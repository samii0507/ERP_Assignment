package com.unicoursemng.unicourse_app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.unicoursemng.unicourse_app.entity.Student;
import com.unicoursemng.unicourse_app.repository.StudentRepository;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    public Student registerStudent(Student student) {
        if (studentRepository.findByEmail(student.getEmail()) != null) {
            throw new RuntimeException("Email already exists");
        }
        return studentRepository.save(student);
    }

    public Student login(String email, String password) {
        Student student = studentRepository.findByEmail(email);
        if (student == null || !student.getPassword().equals(password)) {
            throw new RuntimeException("Invalid credentials");
        }
        return student;
    }
}
