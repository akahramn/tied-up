package com.tiedup.course_service.course.dto;

import com.tiedup.course_service.course.model.Enrollment;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class CourseResponse {
    private UUID id;
    private String title;
    private String description;
    private String category;
    private BigDecimal price;
    private String status;
    private UUID instructorId;
    private List<Enrollment> enrollments;
}
