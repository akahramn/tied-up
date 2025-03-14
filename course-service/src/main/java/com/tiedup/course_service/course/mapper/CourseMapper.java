package com.tiedup.course_service.course.mapper;

import com.tiedup.course_service.course.dto.CourseResponse;
import com.tiedup.course_service.course.model.Course;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CourseMapper {

    CourseMapper INSTANCE = Mappers.getMapper(CourseMapper.class);

    CourseResponse courseToCourseResponse(Course course);
}
