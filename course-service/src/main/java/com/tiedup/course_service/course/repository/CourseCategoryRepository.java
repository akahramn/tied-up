package com.tiedup.course_service.course.repository;

import com.tiedup.course_service.course.model.CourseCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CourseCategoryRepository extends JpaRepository<CourseCategory, UUID> {
}
