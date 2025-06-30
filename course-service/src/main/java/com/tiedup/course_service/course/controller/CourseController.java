package com.tiedup.course_service.course.controller;

import com.tiedup.course_service.course.dto.CourseRequest;
import com.tiedup.course_service.course.dto.CourseResponse;
import com.tiedup.course_service.course.dto.CourseStatusUpdateRequest;
import com.tiedup.course_service.course.dto.EnrollmentRequest;
import com.tiedup.course_service.course.service.CourseService;
import com.tiedup.course_service.security.CurrentUser;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/v1/course")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    @PreAuthorize("hasAnyRole('INSTRUCTOR')")
    @PostMapping("/create")
    public ResponseEntity<CourseResponse> createCourse(@Valid @RequestBody CourseRequest request) {
        return ResponseEntity.ok(courseService.createCourse(request));
    }

    @GetMapping("/fetch-course-list")
    public ResponseEntity<List<CourseResponse>> getAllCourses() {
        return ResponseEntity.ok(courseService.getAllCourses());
    }

    @GetMapping("/fetch-course-by-id/{id}")
    public ResponseEntity<CourseResponse> getCourseById(@PathVariable UUID id) {
        return ResponseEntity.ok(courseService.getCourseById(id));
    }

    @PreAuthorize("hasAnyRole('INSTRUCTOR')")
    @PutMapping("/update/{id}")
    public ResponseEntity<CourseResponse> updateCourse(@PathVariable UUID id, @Valid @RequestBody CourseRequest request) {
        return ResponseEntity.ok(courseService.updateCourse(id, request));
    }

    @PreAuthorize("hasAnyRole('INSTRUCTOR')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable UUID id) {
        courseService.deleteCourse(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasAnyRole('STUDENT')")
    @PostMapping("/enroll")
    public ResponseEntity<Void> enrollCourse(@RequestBody EnrollmentRequest enrollmentRequest) {
        courseService.enrollCourse(enrollmentRequest);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasAnyRole('INSTRUCTOR')")
    @PostMapping("/update-course-status")
    public ResponseEntity<Void> changeCourseStatus(@AuthenticationPrincipal CurrentUser currentUser,
                                                   @RequestBody CourseStatusUpdateRequest courseStatusUpdateRequest) {
        courseService.updateCourseStatus(courseStatusUpdateRequest, currentUser.getUserId());
        return ResponseEntity.noContent().build();
    }
}
