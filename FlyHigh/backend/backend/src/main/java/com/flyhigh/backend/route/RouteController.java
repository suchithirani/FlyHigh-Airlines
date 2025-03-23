package com.flyhigh.backend.route;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/api/routes")
public class RouteController {

    @Autowired
    private RouteService routeService;

    @GetMapping
    public List<Route> getAllRoutes() {
        return routeService.getAllRoutes();
    }

    @GetMapping("/{routeId}")
    public ResponseEntity<Route> getRouteById(@PathVariable Long routeId) {
        return routeService.getRouteById(routeId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Route createRoute(@RequestBody RouteDto routeDTO) {
        return routeService.createRoute(routeDTO);
    }

    @PutMapping("/{routeId}")
    public Route updateRoute(@PathVariable Long routeId, @RequestBody RouteDto routeDTO) {
        return routeService.updateRoute(routeId, routeDTO);
    }

    @DeleteMapping("/{routeId}")
    public void deleteRoute(@PathVariable Long routeId) {
        routeService.deleteRoute(routeId);
    }

    @GetMapping("/origin/{originAirportId}")
    public List<Route> getRoutesByOriginAirport(@PathVariable Long originAirportId) {
        return routeService.getRoutesByOriginAirport(originAirportId);
    }
}