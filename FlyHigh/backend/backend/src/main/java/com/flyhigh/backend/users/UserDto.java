package com.flyhigh.backend.users;

import lombok.Data;
import java.util.Date;

@Data
public class UserDto {
    private Long userId;
    private String email;
    private String firstName;
    private String lastName;
    private Date dateOfBirth;
    private String phoneNumber;
    private String address;
    private Role role;
}