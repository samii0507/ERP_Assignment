package com.unicoursemng.unicourse_app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.unicoursemng.unicourse_app.entity.Content;
import com.unicoursemng.unicourse_app.entity.Course;
import com.unicoursemng.unicourse_app.repository.CourseRepository;
import com.unicoursemng.unicourse_app.service.ContentService;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/content")
public class ContentController {
    @Autowired
    private ContentService contentService;
    @Autowired
    private CourseRepository courseRepository;

    @GetMapping("/by-course/{courseId}")
    public ResponseEntity<?> getContentByCourse(@PathVariable Long courseId) {
        Course course = courseRepository.findById(courseId).orElse(null);
        if (course == null) {
            return ResponseEntity.badRequest().body("Course not found");
        }
        List<Content> contentList = contentService.getContentByCourse(course);
        return ResponseEntity.ok(contentList);
    }
}
