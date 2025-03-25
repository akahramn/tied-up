package com.tiedup.live.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "session_participant", schema = "live")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SessionParticipant {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false)
    private UUID liveSessionId;

    @Column(nullable = false)
    private UUID userId;
}
