package com.tiedup.server;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class DemoController {

    @GetMapping("/1")
    public ResponseEntity<?> getTest() {
        return ResponseEntity.ok().body("HELOOO");
    }
}
