package com.flyhigh.backend.airport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AirportService {

    @Autowired
    private AirportRepository airportRepository;

    public List<Airport> getAllAirports() {
        return airportRepository.findAll();
    }

    public Optional<Airport> getAirportById(Long airportId) {
        return airportRepository.findById(airportId);
    }

    public Airport createAirport(Airport airport) {
        return airportRepository.save(airport);
    }

    public Airport updateAirport(Long airportId, Airport airportDetails) {
        Airport airport = airportRepository.findById(airportId)
                .orElseThrow(() -> new RuntimeException("Airport not found"));
        airport.setAirportCode(airportDetails.getAirportCode());
        airport.setAirportName(airportDetails.getAirportName());
        airport.setCity(airportDetails.getCity());
        airport.setCountry(airportDetails.getCountry());
        airport.setLatitude(airportDetails.getLatitude());
        airport.setLongitude(airportDetails.getLongitude());
        return airportRepository.save(airport);
    }

    public void deleteAirport(Long airportId) {
        airportRepository.deleteById(airportId);
    }

    public Airport getAirportByCode(String airportCode) {
        return airportRepository.findByAirportCode(airportCode);
    }
}