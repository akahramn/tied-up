package com.tiedup.course_service.course.dto;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Data
public class CourseFilterRequest {
    private String query;
    private String category;
    private String priceType;
    private int page = 0;
    private int size = 10;
    private String sortBy = "createdAt";
    private String sortDirection = "ASC";
}
