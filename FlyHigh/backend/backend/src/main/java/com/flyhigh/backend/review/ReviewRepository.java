package com.flyhigh.backend.review;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByFlightFlightId(Long flightId);
    List<Review> findByUserUserId(Long userId);
}
