package com.tiedup.course_service.course.service;

import com.tiedup.course_service.course.dto.CourseRequest;
import com.tiedup.course_service.course.dto.CourseResponse;
import com.tiedup.course_service.course.dto.CourseStatusUpdateRequest;
import com.tiedup.course_service.course.dto.EnrollmentRequest;
import com.tiedup.course_service.course.mapper.CourseMapper;
import com.tiedup.course_service.course.model.Course;
import com.tiedup.course_service.course.model.Enrollment;
import com.tiedup.course_service.course.repository.CourseRepository;
import com.tiedup.course_service.course.repository.EnrollmentRepository;
import com.tiedup.course_service.course.type.CourseStatus;
import com.tiedup.course_service.exception.ForbiddenException;
import com.tiedup.course_service.exception.NotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseService {
    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;

    public CourseResponse createCourse(CourseRequest request) {
        Course course = Course.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .category(request.getCategory())
                .price(request.getPrice())
                .status(CourseStatus.ACTIVE)
                .instructorId(request.getInstructorId())
                .build();

        Course savedCourse = courseRepository.save(course);

        return CourseMapper.INSTANCE.courseToCourseResponse(savedCourse);
    }

    public List<CourseResponse> getAllCourses() {
        return courseRepository.findAll()
                .stream()
                .map(CourseMapper.INSTANCE::courseToCourseResponse)
                .collect(Collectors.toList());
    }

    public CourseResponse getCourseById(UUID id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ders bulunamadı!"));
        return CourseMapper.INSTANCE.courseToCourseResponse(course);
    }

    public CourseResponse updateCourse(UUID id, CourseRequest request) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ders bulunamadı!"));

        course.setTitle(request.getTitle());
        course.setDescription(request.getDescription());
        course.setCategory(request.getCategory());
        course.setPrice(request.getPrice());

        Course updatedCourse = courseRepository.save(course);
        return CourseMapper.INSTANCE.courseToCourseResponse(updatedCourse);
    }

    public void deleteCourse(UUID id) {

    }

    @Transactional
    public String enrollCourse(EnrollmentRequest enrollmentRequest) {
        // Ders mevcut mu kontrol et
        Course course = courseRepository.findById(enrollmentRequest.getCourseId())
                .orElseThrow(() -> new RuntimeException("Ders bulunamadı!"));

        // Öğrenci zaten kayıtlı mı?
        Optional<Enrollment> existingEnrollment = enrollmentRepository
                .findByCourseIdAndStudentId(enrollmentRequest.getCourseId(), enrollmentRequest.getStudentId());

        if (existingEnrollment.isPresent()) {
            throw new RuntimeException("Öğrenci zaten bu derse kayıtlı!");
        }

        // Kayıt oluştur
        Enrollment enrollment = Enrollment.builder()
                .course(course)
                .studentId(enrollmentRequest.getStudentId())
                .build();

        enrollmentRepository.save(enrollment);
        return "Öğrenci başarıyla kaydedildi!";
    }

    @Transactional
    public void updateCourseStatus(CourseStatusUpdateRequest request, UUID instructorId) {
        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new NotFoundException("Ders bulunamadı!"));

        if (!course.getInstructorId().equals(instructorId)) {
            throw new ForbiddenException("Sadece dersin sahibi olan eğitmen bu işlemi yapabilir.");
        }

        course.setStatus(CourseStatus.valueOf(request.getStatus()));
        courseRepository.save(course);
    }
}
