package com.tiedup.server.user.repository;

import com.tiedup.server.user.model.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    Optional<User> findByEmail(String email);

    @Transactional
    @Modifying
    @Query("update User u set u.password = :password where u.email = :username")
    void updatePassword(@Param("username") String username, @Param("password") String password);
}
