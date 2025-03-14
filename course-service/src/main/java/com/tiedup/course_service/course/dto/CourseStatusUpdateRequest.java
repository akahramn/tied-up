package com.tiedup.course_service.course.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

@Data
@RequiredArgsConstructor
public class CourseStatusUpdateRequest {
    private UUID courseId;
    private String status;
}
