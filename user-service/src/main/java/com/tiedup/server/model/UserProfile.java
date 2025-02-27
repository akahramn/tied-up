package com.tiedup.server.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;

@Entity
@Table(name = "user_profile", schema = "user-service")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfile {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "record_id", updatable = false, nullable = false)
    private UUID recordId;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "bio")
    private String bio;

    @Column(name = "expertise_area")
    private String expertiseArea;

    @Column(name = "course_count", columnDefinition = "INT DEFAULT 0")
    private Integer courseCount;
    }
