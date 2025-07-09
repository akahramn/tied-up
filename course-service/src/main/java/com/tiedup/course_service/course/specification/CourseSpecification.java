package com.tiedup.course_service.course.specification;

import com.tiedup.course_service.course.dto.CourseFilterRequest;
import com.tiedup.course_service.course.model.Course;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class CourseSpecification {
    public static Specification<Course> build(CourseFilterRequest filter) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (filter.getQuery() != null && !filter.getQuery().isEmpty()) {
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("title")), "%" + filter.getQuery().toLowerCase() + "%"));
            }

            if (filter.getCategory() != null) {
                predicates.add(criteriaBuilder.equal(root.get("category"), filter.getCategory()));
            }

            if ("free".equals(filter.getPriceType())) {
                predicates.add(criteriaBuilder.equal(root.get("price"), 0));
            } else if ("paid".equals(filter.getPriceType())) {
                predicates.add(criteriaBuilder.greaterThan(root.get("price"), 0));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
