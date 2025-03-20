package com.tiedup.payment.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "transaction", schema = "payment")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "payment_id", nullable = false)
    private Payment payment;  // İlgili ödeme kaydı

    @Column(nullable = false)
    private String transactionId;  // Stripe veya Iyzico işlem kimliği

    @Column(nullable = false)
    private BigDecimal amount;  // Ödeme miktarı

    @Column(nullable = false)
    private String status;  // Başarılı, başarısız vb.

    @Column(nullable = false)
    private LocalDateTime transactionDate;  // İşlem tarihi

    @PrePersist
    protected void onCreate() {
        transactionDate = LocalDateTime.now();
    }
}
