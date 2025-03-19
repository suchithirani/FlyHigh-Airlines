package com.flyhigh.backend.review;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewDto {
    private Long userId;
    private Long flightId;
    private Integer rating;
    private String comment;
}
