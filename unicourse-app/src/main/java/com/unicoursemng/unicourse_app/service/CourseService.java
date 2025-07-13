package com.unicoursemng.unicourse_app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.unicoursemng.unicourse_app.entity.Course;
import com.unicoursemng.unicourse_app.repository.CourseRepository;

@Service
public class CourseService {
    @Autowired
    private CourseRepository courseRepository;

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }
}
