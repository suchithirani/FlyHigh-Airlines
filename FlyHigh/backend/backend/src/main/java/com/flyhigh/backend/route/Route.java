package com.flyhigh.backend.route;

import com.flyhigh.backend.airport.Airport;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "ROUTES")
@Data
public class Route {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long routeId;

    @ManyToOne
    @JoinColumn(name = "origin_airport_id", nullable = false)
    private Airport originAirport;

    @ManyToOne
    @JoinColumn(name = "destination_airport_id", nullable = false)
    private Airport destinationAirport;

    @Column(nullable = false)
    private Integer distance; // Distance in kilometers

    @Column(nullable = false)
    private Integer flightTime; // Flight time in minutes
}