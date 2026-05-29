package com.anh;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import com.stripe.Stripe;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

@SpringBootTest
class OnlineFoodOrderingApplicationTests {

    @Value("${stripe.api.key}")
    private String stripeSecretKey;

    @Test
    void testStripeConnection() {
        System.out.println("=========================================");
        System.out.println("STRIPE KEY: " + stripeSecretKey);
        try {
            Stripe.apiKey = stripeSecretKey;
            SessionCreateParams params = SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:5173/success")
                .setCancelUrl("http://localhost:5173/fail")
                .addLineItem(SessionCreateParams.LineItem.builder()
                    .setQuantity(1L)
                    .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                        .setCurrency("usd")
                        .setUnitAmount(1000L) // $10.00
                        .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder()
                            .setName("Test Product")
                            .build())
                        .build())
                    .build())
                .build();
            Session session = Session.create(params);
            System.out.println("STRIPE SESSION URL: " + session.getUrl());
        } catch (Exception e) {
            System.out.println("STRIPE ERROR LOGGED:");
            e.printStackTrace();
        }
        System.out.println("=========================================");
    }
}
