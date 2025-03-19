package com.flyhigh.backend.booking;
import com.flyhigh.backend.flight.Flight;
import com.flyhigh.backend.flight.FlightRepository;
import com.flyhigh.backend.users.*;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookingService {
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final FlightRepository flightRepository;

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Optional<Booking> getBookingById(Long id) {
        return bookingRepository.findById(id);
    }

    public List<Booking> getBookingsByUserId(Long userId) {
        return bookingRepository.findByUserUserId(userId);
    }

    public Booking createBooking(BookingDto request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Flight flight = flightRepository.findById(request.getFlightId())
                .orElseThrow(() -> new RuntimeException("Flight not found"));

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setFlight(flight);
        booking.setBookingDate(request.getBookingDate());
        booking.setNumberOfSeats(request.getNumberOfSeats());
        booking.setTotalAmount(request.getTotalAmount());
        booking.setStatus(BookingStatus.PENDING);

        return bookingRepository.save(booking);
    }

    public Booking updateBooking(Long id, BookingDto request) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setBookingDate(request.getBookingDate());
        booking.setNumberOfSeats(request.getNumberOfSeats());
        booking.setTotalAmount(request.getTotalAmount());

        return bookingRepository.save(booking);
    }

    public Booking updateBookingStatus(Long id, BookingStatus status) {
      Booking booking = bookingRepository.findById(id)
              .orElseThrow(() -> new RuntimeException("Booking not found"));
  
      booking.setStatus(status);
      return bookingRepository.save(booking);
  }

    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }
}
