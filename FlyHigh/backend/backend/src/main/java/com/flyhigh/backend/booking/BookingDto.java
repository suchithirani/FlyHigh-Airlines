package com.flyhigh.backend.booking;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
public class BookingDto {
    private Long userId;
    private Long flightId;
    private LocalDateTime bookingDate;
    private Integer numberOfSeats;
    private Double totalAmount;
    private BookingStatus status;
}
