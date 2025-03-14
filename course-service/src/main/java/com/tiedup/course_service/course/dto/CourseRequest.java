package com.tiedup.course_service.course.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.UUID;

@Getter
@Setter
public class CourseRequest {

    @NotBlank(message = "Ders başlığı boş olamaz")
    private String title;

    private String description;

    @NotBlank(message = "Kategori boş olamaz")
    private String category;

    @NotNull(message = "Fiyat belirtilmelidir")
    @Min(value = 0, message = "Fiyat negatif olamaz")
    private BigDecimal price;

    @NotNull(message = "Eğitmen ID boş olamaz")
    private UUID instructorId;
}
