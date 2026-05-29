package com.anh.controller;

import com.anh.model.Order;
import com.anh.model.User;
import com.anh.request.CreateOrderRequest;
import com.anh.response.PaymentResponse;
import com.anh.service.OrderService;
import com.anh.service.PaymentService;
import com.anh.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @Autowired
    private PaymentService paymentService; // Tiêm Service thanh toán vào đây

    @PostMapping("/order")
    public ResponseEntity<PaymentResponse> createOrder(@RequestBody CreateOrderRequest req,
                                                       @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Order order = orderService.createOrder(req, user);

        // Thay vì trả về Order thuần, gọi Stripe để lấy link thanh toán
        PaymentResponse res = paymentService.createPaymentLink(order);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PutMapping("/order/{orderId}/complete-payment")
    public ResponseEntity<Order> completePayment(@PathVariable Long orderId,
                                                 @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Order order = orderService.findOrderById(orderId);
        if (!order.getCustomer().getId().equals(user.getId())) {
            throw new Exception("You do not have permission to update this order.");
        }
        Order updatedOrder = orderService.updateOrder(orderId, "PAID");
        return new ResponseEntity<>(updatedOrder, HttpStatus.OK);
    }
}