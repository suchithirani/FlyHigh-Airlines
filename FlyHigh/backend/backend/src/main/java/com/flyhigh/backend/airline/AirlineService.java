package com.flyhigh.backend.airline;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AirlineService {
    private final AirlineRepository airlineRepository;

    public List<Airline> getAllAirlines() {
        return airlineRepository.findAll();
    }

    public Optional<Airline> getAirlineById(Long id) {
        return airlineRepository.findById(id);
    }

    public Airline createAirline(AirlineDto request) {
        Airline airline = new Airline();
        airline.setAirlineName(request.getAirlineName());
        airline.setAirlineCode(request.getAirlineCode());
        airline.setCountry(request.getCountry());

        return airlineRepository.save(airline);
    }

    public Airline updateAirline(Long id, AirlineDto request) {
        Airline airline = airlineRepository.findById(id).orElseThrow();
        airline.setAirlineName(request.getAirlineName());
        airline.setAirlineCode(request.getAirlineCode());
        airline.setCountry(request.getCountry());

        return airlineRepository.save(airline);
    }

    public void deleteAirline(Long id) {
        airlineRepository.deleteById(id);
    }
}
