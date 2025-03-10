package com.flyhigh.backend.models;

import jakarta.persistence.*;
import lombok.*;



@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String passwordHash;

    private String firstName;
    private String lastName;
   
    private String phoneNumber;
    

    @Enumerated(EnumType.STRING)
    private UserRole userRole;
}

enum UserRole {
    ADMIN, CUSTOMER
}
