package com.tiedup.server.user.controller;

import com.tiedup.server.user.type.UserDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @PostMapping("/test")
    public ResponseEntity<?> createUser(@RequestBody UserDto userDto) {
        return ResponseEntity.ok().body("");
    }
}
