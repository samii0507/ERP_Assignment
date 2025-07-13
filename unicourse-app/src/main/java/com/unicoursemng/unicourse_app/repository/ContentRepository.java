package com.unicoursemng.unicourse_app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.unicoursemng.unicourse_app.entity.Content;
import com.unicoursemng.unicourse_app.entity.Course;

public interface ContentRepository extends JpaRepository<Content, Long> {
    List<Content> findByCourse(Course course);
}
