package com.tiedup.server.user.repository;

import com.tiedup.server.user.model.UserActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserActivityRepository extends JpaRepository<UserActivity, UUID> {
}
