package com.flyhigh.backend.airport;

import lombok.Data;

@Data
public class AirportDto {
    private Long airportId;
    private String airportCode;
    private String airportName;
    private String city;
    private String country;
    private Double latitude;
    private Double longitude;
}