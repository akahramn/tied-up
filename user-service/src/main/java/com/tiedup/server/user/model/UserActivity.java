package com.tiedup.server.user.model;

import com.tiedup.server.user.dto.ActivityType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "user_activity", schema = "user-service")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserActivity {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "activity_id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Enumerated(EnumType.STRING)
    @Column(name = "activity_type", nullable = false, length = 100)
    private ActivityType activityType; // login, logout, profile_update, password_change, lesson_enrolled

    @Column(name = "activity_details", columnDefinition = "TEXT")
    private String activityDetails; // Örn: "Kullanıcı profil bilgilerini güncelledi."

    @Column(name = "ip_address", length = 45)
    private String ipAddress; // Kullanıcının IP adresi

    @Column(name = "user_agent", columnDefinition = "TEXT")
    private String userAgent; // Kullanıcının tarayıcı bilgisi

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
