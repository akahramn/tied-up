package com.tiedup.live.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "session", schema = "live")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LiveSession {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false)
    private UUID courseId;

    @Column(nullable = false)
    private UUID instructorId;

    @Column(nullable = false)
    private LocalDateTime startTime; // ISO-8601 formatında "2024-03-10T14:00:00Z"

    @Column(nullable = false)
    private String status; // PLANNED, ONGOING, COMPLETED

    @Column(nullable = false)
    private String webrtcRoomId; // WebRTC odası için ID
}
