package com.unicoursemng.unicourse_app;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/results")
public class ResultController {

    @Autowired
    private ResultRepository resultRepository;

    @GetMapping
    public List<Result> getAllResults() {
        return resultRepository.findAll();
    }

    @PostMapping
    public Result createResult(@RequestBody Result result) {
        return resultRepository.save(result);
    }
}
