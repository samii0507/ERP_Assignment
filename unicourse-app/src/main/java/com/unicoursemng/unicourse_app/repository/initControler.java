package com.unicoursemng.unicourse_app.repository;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class initControler {
    @GetMapping("/")
    public String welcome() {
        return "Welcome to UniCourse Spring Boot App!";
    }
}
