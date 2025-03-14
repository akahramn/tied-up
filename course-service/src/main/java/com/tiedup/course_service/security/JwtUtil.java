package com.tiedup.course_service.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private static final String SECRET_KEY = "8pyIi1skgLqIBPVqCYFdKgYpyzfwWlArb75bKWz9Z5fcSmkHYvCcBiFOiFoGOvA1P0vifPRPHGsJiP6RwIt0VgEE0Vt6UBAlgZEs4u248Q6t5afBppAapasJSP2KyHJw8ZKVQ7RwTLi2Gl892di5cFr868KHFQW6DE0EbuhZECo70qTC3dFD4K2BsXjXiRgF8Sc61MyxZtluF0b9aqwyk3ktelI2YJldUbGZwhZIHYwLuVyik5vzHgGeLVwe5eh2"; // User Service ile aynı olmalı!

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    public Claims extractClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String extractRole(String token) {
        return extractClaims(token).get("role", String.class); // Kullanıcının rolünü oku
    }

    public String extractUserId(String token) {
        return extractClaims(token).getSubject(); // Kullanıcı ID'sini oku
    }

    public boolean isTokenValid(String token) {
        return extractClaims(token).getExpiration().after(new Date());
    }
}
