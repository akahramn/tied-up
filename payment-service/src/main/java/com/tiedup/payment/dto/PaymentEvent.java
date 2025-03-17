package com.tiedup.payment.dto;

import lombok.*;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PaymentEvent {
    private UUID userId;
    private UUID courseId;
    private String status;
}
