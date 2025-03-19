package com.flyhigh.backend.route;

import com.flyhigh.backend.airport.Airport;
import com.flyhigh.backend.airport.AirportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RouteService {

    @Autowired
    private RouteRepository routeRepository;

    @Autowired
    private AirportRepository airportRepository;

    public List<Route> getAllRoutes() {
        return routeRepository.findAll();
    }

    public Optional<Route> getRouteById(Long routeId) {
        return routeRepository.findById(routeId);
    }

    public Route createRoute(RouteDto routeDTO) {
        Airport originAirport = airportRepository.findById(routeDTO.getOriginAirportId())
                .orElseThrow(() -> new RuntimeException("Origin airport not found"));
        Airport destinationAirport = airportRepository.findById(routeDTO.getDestinationAirportId())
                .orElseThrow(() -> new RuntimeException("Destination airport not found"));

        Route route = new Route();
        route.setOriginAirport(originAirport);
        route.setDestinationAirport(destinationAirport);
        route.setDistance(routeDTO.getDistance());
        route.setFlightTime(routeDTO.getFlightTime());

        return routeRepository.save(route);
    }

    public Route updateRoute(Long routeId, RouteDto routeDTO) {
        Route route = routeRepository.findById(routeId)
                .orElseThrow(() -> new RuntimeException("Route not found"));

        Airport originAirport = airportRepository.findById(routeDTO.getOriginAirportId())
                .orElseThrow(() -> new RuntimeException("Origin airport not found"));
        Airport destinationAirport = airportRepository.findById(routeDTO.getDestinationAirportId())
                .orElseThrow(() -> new RuntimeException("Destination airport not found"));

        route.setOriginAirport(originAirport);
        route.setDestinationAirport(destinationAirport);
        route.setDistance(routeDTO.getDistance());
        route.setFlightTime(routeDTO.getFlightTime());

        return routeRepository.save(route);
    }

    public void deleteRoute(Long routeId) {
        routeRepository.deleteById(routeId);
    }

    public List<Route> getRoutesByOriginAirport(Long originAirportId) {
        return routeRepository.findByOriginAirport_AirportId(originAirportId);
    }
}