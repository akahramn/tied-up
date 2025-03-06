package com.tiedup.server.user.type;

import lombok.Data;

@Data
public class UserDto {
    private String email;
    private String passwordHash;
    private String firstName;
    private String lastName;
    private String role; // student, instructor, admin
}
