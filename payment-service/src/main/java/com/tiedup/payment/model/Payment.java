package com.tiedup.payment.model;

import com.tiedup.payment.type.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "payment", schema = "payment")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private UUID userId;  // Ödeme yapan kullanıcı ID

    @Column(nullable = false)
    private UUID courseId; // Satın alınan kursun ID’si

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentStatus status;  // Ödeme durumu

    @Column(nullable = false)
    private BigDecimal amount;  // Ödeme miktarı

    @Column(nullable = false)
    private String currency;  // USD, EUR, TRY gibi

    @Column(nullable = false)
    private LocalDateTime createdAt;  // Ödeme tarihi

    private LocalDateTime updatedAt;  // Güncellenme tarihi

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

}
