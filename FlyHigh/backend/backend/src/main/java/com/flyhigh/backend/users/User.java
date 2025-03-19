package com.flyhigh.backend.users;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Entity
@Table(name = "USERS")
@Data
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password; // Changed from passwordHash

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Temporal(TemporalType.DATE) // Ensures only the date part is stored
    @Column(nullable = false)
    private Date dateOfBirth;

    @Column(nullable = false, unique = true) // Phone number should be unique
    private String phoneNumber;

    @Column(nullable = false, length = 255) // Length constraint for address
    private String address;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false) // Every user should have a role
    private Role role;

    @PrePersist
    protected void onCreate() {
        if (role == null) {
            role = Role.USER; // Default role
        }
    }
}
