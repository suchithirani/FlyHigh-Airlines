package com.flyhigh.backend.airport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/airports")
public class AirportController {

    @Autowired
    private AirportService airportService;

    @GetMapping
    public List<Airport> getAllAirports() {
        return airportService.getAllAirports();
    }

    @GetMapping("/{airportId}")
    public ResponseEntity<Airport> getAirportById(@PathVariable Long airportId) {
        return airportService.getAirportById(airportId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Airport createAirport(@RequestBody Airport airport) {
        return airportService.createAirport(airport);
    }

    @PutMapping("/{airportId}")
    public Airport updateAirport(@PathVariable Long airportId, @RequestBody Airport airportDetails) {
        return airportService.updateAirport(airportId, airportDetails);
    }

    @DeleteMapping("/{airportId}")
    public void deleteAirport(@PathVariable Long airportId) {
        airportService.deleteAirport(airportId);
    }

    @GetMapping("/code/{airportCode}")
    public ResponseEntity<Airport> getAirportByCode(@PathVariable String airportCode) {
        Airport airport = airportService.getAirportByCode(airportCode);
        if (airport != null) {
            return ResponseEntity.ok(airport);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}