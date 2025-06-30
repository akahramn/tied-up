package com.tiedup.server.user.service;

import com.tiedup.server.user.dto.UserResponse;
import com.tiedup.server.user.model.User;
import com.tiedup.server.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserActivityService userActivityService;

    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public void updatePassword(String username, String password) {
        userRepository.updatePassword(username, password);
    }

    public UserResponse getMe(UserDetails userDetails) {
        User user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));
        return new UserResponse(user);
    }
}
