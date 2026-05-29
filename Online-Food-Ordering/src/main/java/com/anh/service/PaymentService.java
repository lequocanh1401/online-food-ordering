package com.anh.service;

import com.anh.model.Order;
import com.anh.response.PaymentResponse;
import com.stripe.exception.StripeException;

public interface PaymentService {
    PaymentResponse createPaymentLink(Order order) throws StripeException;
}