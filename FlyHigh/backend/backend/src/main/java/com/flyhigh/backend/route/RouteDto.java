package com.flyhigh.backend.route;

import lombok.Data;

@Data
public class RouteDto {
    private Long routeId;
    private Long originAirportId;
    private Long destinationAirportId;
    private Integer distance;
    private Integer flightTime;
}