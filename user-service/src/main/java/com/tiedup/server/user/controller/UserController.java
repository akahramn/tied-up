package com.tiedup.server.user.controller;

import com.sun.security.auth.UserPrincipal;
import com.tiedup.server.user.service.UserService;
import com.tiedup.server.user.type.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<?> getMe(@AuthenticationPrincipal UserDetails userDetails) {

        return ResponseEntity.ok().body(userService.getMe(userDetails));
    }

    @PostMapping("/test")
    public ResponseEntity<?> createUser(@RequestBody UserDto userDto) {
        return ResponseEntity.ok().body("");
    }
}
