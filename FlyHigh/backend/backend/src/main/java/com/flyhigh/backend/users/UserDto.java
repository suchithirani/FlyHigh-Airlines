package com.flyhigh.backend.users;

import lombok.Data;

@Data
public class UserDto {
    private Long userId;
    private String email;
    private String password;
     private Role role;
    @Override
    public String toString() {
        return "UserDto [ email=" + email + ", password=" + password + "]";
    }
}