package com.tiedup.course_service.course.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
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
}
