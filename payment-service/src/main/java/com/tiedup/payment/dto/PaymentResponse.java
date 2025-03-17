package com.tiedup.payment.dto;

import com.tiedup.payment.type.PaymentStatus;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class PaymentResponse {
    private UUID id;
    private UUID userId;
    private UUID courseId;
    private PaymentStatus status;
    private BigDecimal amount;
    private String currency;
    private LocalDateTime createdAt;
}
