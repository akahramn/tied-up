package com.tiedup.live.repository;

import com.tiedup.live.model.LiveSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface SessionRepository extends JpaRepository<LiveSession, UUID> {
}
