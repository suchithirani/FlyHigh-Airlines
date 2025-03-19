package com.flyhigh.backend.airport;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AirportRepository extends JpaRepository<Airport, Long> {
    // Example custom query to find an airport by its code
    Airport findByAirportCode(String airportCode);
}