package com.tiedup.payment.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.util.UUID;

@Data
public class PaymentRequest {
    @NotNull(message = "Kullanıcı ID boş olamaz")
    private UUID userId;

    @NotNull(message = "Kurs ID boş olamaz")
    private UUID courseId;

    @NotNull(message = "Ödeme miktarı boş olamaz")
    private BigDecimal amount;

    @NotNull(message = "Para birimi boş olamaz")
    private String currency;
}
