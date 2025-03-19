package com.flyhigh.backend.route;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RouteRepository extends JpaRepository<Route, Long> {
    // Example custom query to find routes by origin airport
    List<Route> findByOriginAirport_AirportId(Long originAirportId);
}