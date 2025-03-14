package com.tiedup.course_service.course.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Data
@RequiredArgsConstructor
public class EnrollmentRequest {
    @NotNull(message = "Öğrenci ID boş olamaz")
    private UUID studentId;
    @NotNull
    private UUID courseId;
}