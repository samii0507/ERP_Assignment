package com.unicoursemng.unicourse_app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.unicoursemng.unicourse_app.entity.Content;
import com.unicoursemng.unicourse_app.entity.Course;
import com.unicoursemng.unicourse_app.repository.ContentRepository;

@Service
public class ContentService {
    @Autowired
    private ContentRepository contentRepository;

    public List<Content> getContentByCourse(Course course) {
        return contentRepository.findByCourse(course);
    }
}
