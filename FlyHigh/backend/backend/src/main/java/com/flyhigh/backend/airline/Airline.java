package com.flyhigh.backend.airline;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "airlines")
@Data
public class Airline {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long airlineId;

    @Column(nullable = false, unique = true)
    private String airlineName;

    @Column(nullable = false)
    private String airlineCode; // e.g., AI for Air India

    @Column(nullable = false)
    private String country;
}
