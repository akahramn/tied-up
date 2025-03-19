package com.tiedup.course_service.course.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentEvent {
    private UUID userId;
    private UUID courseId;
    private String status;
}
