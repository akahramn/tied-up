package com.tiedup.live.controller;

import com.tiedup.live.model.LiveSession;
import com.tiedup.live.repository.SessionRepository;
import com.tiedup.live.security.CurrentUser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/live-session")
@RequiredArgsConstructor
public class LiveSessionController {
    private final SessionRepository sessionRepository;

    @PostMapping
    public ResponseEntity<LiveSession> createLiveSession(@RequestBody LiveSession session) {
        return ResponseEntity.ok(sessionRepository.save(session));
    }

    @GetMapping
    public ResponseEntity<List<LiveSession>> getUserLiveSessions(@AuthenticationPrincipal CurrentUser currentUser) {
        UUID userId = UUID.fromString(currentUser.getUsername());
        List<LiveSession> sessions = sessionRepository.findAll();
        return ResponseEntity.ok(sessions);
    }
}
