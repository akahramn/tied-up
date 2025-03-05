package com.tiedup.server.user.service;

import com.tiedup.server.user.dto.ActivityType;
import com.tiedup.server.user.model.UserActivity;
import com.tiedup.server.user.repository.UserActivityRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserActivityService {

    private final UserActivityRepository userActivityRepository;

    public void logActivity(UUID userId, String activityType, String details, HttpServletRequest request) {
        UserActivity activity = UserActivity.builder()
                .userId(userId)
                .activityType(ActivityType.valueOf(activityType))
                .activityDetails(details)
                .ipAddress(request.getRemoteAddr())
                .userAgent(request.getHeader("User-Agent"))
                .createdAt(LocalDateTime.now())
                .build();
        userActivityRepository.save(activity);
    }
}
