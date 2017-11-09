package me.loki2302.backend;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Collections;

@RequestMapping("/api")
public class ApiController {
    @GetMapping("hello")
    public ResponseEntity<?> ping() {
        return ResponseEntity.ok(Collections.singletonMap("message", "hi there"));
    }
}
