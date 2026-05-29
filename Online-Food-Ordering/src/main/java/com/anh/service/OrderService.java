package com.anh.service;

import com.anh.model.Order;
import com.anh.model.User;
import com.anh.request.CreateOrderRequest;
import java.util.List;

public interface OrderService {
    public Order createOrder(CreateOrderRequest order, User user) throws Exception;
    public Order updateOrder(Long orderId, String orderStatus) throws Exception;
    public void cancelOrder(Long orderId) throws Exception;
    public List<Order> getUsersOrder(Long userId) throws Exception;
    public List<Order> getRestaurantsOrder(Long restaurantId, String orderStatus) throws Exception;
    public Order findOrderById(Long orderId) throws Exception;
}