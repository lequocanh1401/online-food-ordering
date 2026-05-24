package com.anh.repository;

import com.anh.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    // Tìm lịch sử đặt hàng của một khách hàng
    public List<Order> findByCustomerId(Long userId);

    // Tìm tất cả các đơn hàng đổ về một nhà hàng cụ thể
    public List<Order> findByRestaurantId(Long restaurantId);
}