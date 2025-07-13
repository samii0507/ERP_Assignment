package com.unicoursemng.unicourse_app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.unicoursemng.unicourse_app.entity.Course;
import com.unicoursemng.unicourse_app.entity.Registration;
import com.unicoursemng.unicourse_app.entity.Student;
import com.unicoursemng.unicourse_app.repository.RegistrationRepository;

@Service
public class RegistrationService {
    @Autowired
    private RegistrationRepository registrationRepository;

    public Registration registerCourse(Student student, Course course) {
        // Prevent duplicate registrations
        Registration reg = registrationRepository.findByStudentAndCourse(student, course);
        if (reg != null) {
            throw new RuntimeException("Already registered for this course");
        }
        Registration registration = new Registration();
        registration.setStudent(student);
        registration.setCourse(course);
        return registrationRepository.save(registration);
    }

    public List<Registration> getRegistrationsByStudent(Student student) {
        return registrationRepository.findByStudent(student);
    }
}
