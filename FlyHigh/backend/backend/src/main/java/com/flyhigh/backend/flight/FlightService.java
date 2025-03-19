package com.flyhigh.backend.flight;

import com.flyhigh.backend.airline.AirlineRepository;
import com.flyhigh.backend.route.RouteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FlightService {
    private final FlightRepository flightRepository;
    private final RouteRepository routeRepository;
    private final AirlineRepository airlineRepository;

    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }

    public Optional<Flight> getFlightById(Long id) {
        return flightRepository.findById(id);
    }

    public Flight createFlight(FlightDto request) {
        Flight flight = new Flight();
        flight.setRoute(routeRepository.findById(request.getRouteId()).orElseThrow());
        flight.setAirline(airlineRepository.findById(request.getAirlineId()).orElseThrow());
        flight.setFlightNumber(request.getFlightNumber());
        flight.setDepartureTime(request.getDepartureTime());
        flight.setArrivalTime(request.getArrivalTime());
        flight.setAvailableSeats(request.getAvailableSeats());
        flight.setTicketPrice(request.getTicketPrice());

        return flightRepository.save(flight);
    }

    public Flight updateFlight(Long id, FlightDto request) {
        Flight flight = flightRepository.findById(id).orElseThrow();
        flight.setRoute(routeRepository.findById(request.getRouteId()).orElseThrow());
        flight.setAirline(airlineRepository.findById(request.getAirlineId()).orElseThrow());
        flight.setFlightNumber(request.getFlightNumber());
        flight.setDepartureTime(request.getDepartureTime());
        flight.setArrivalTime(request.getArrivalTime());
        flight.setAvailableSeats(request.getAvailableSeats());
        flight.setTicketPrice(request.getTicketPrice());

        return flightRepository.save(flight);
    }

    public void deleteFlight(Long id) {
        flightRepository.deleteById(id);
    }
}
