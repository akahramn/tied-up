package com.tiedup.server.security.auth.controller;

import com.tiedup.server.redis.RedisRateLimiterService;
import com.tiedup.server.security.auth.dto.*;
import com.tiedup.server.security.auth.service.AuthenticationService;
import com.tiedup.server.security.config.RateLimiterFilter;
import com.tiedup.server.user.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;
    private final UserService userService;
    private final RedisRateLimiterService rateLimiterService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(service.register(request));
    }
    @PostMapping("/login")
    public ResponseEntity<?> authenticate(
            @RequestBody AuthenticationRequest request,
            HttpServletRequest httpServletRequest
    ) {
        // Kullanıcının IP adresini al
        String clientIp = httpServletRequest.getRemoteAddr();

        // Rate limit kontrolü
//        if (!rateLimiterService.isAllowed(clientIp)) {
//            return ResponseEntity.status(429).body("Çok fazla giriş denemesi yaptınız. Lütfen 10 dakika sonra tekrar deneyin.");
//        }
        return ResponseEntity.ok(service.login(request, httpServletRequest));
    }

    @PostMapping("/refresh-token")
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        service.refreshToken(request, response);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(
            @RequestBody ResetPasswordRequest request
    ) {
        service.resetPassword(request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/forgot-password")
    public void forgotPassword(@RequestBody ForgotPasswordRequest request) throws IOException {
        service.forgotPassword(request);
    }
}
