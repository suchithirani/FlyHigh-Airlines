package com.flyhigh.backend.payment;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentDto {
    private Long bookingId;
    private Double amount;
    private String transactionId;
}
