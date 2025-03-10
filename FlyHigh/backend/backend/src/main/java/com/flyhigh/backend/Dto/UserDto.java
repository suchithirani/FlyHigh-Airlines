package com.flyhigh.backend.Dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {
    private String email;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String address;
}

