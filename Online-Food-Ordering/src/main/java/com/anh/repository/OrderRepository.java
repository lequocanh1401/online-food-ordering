package com.anh.repository;

import com.anh.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    // Tìm lịch sử đặt hàng của một khách hàng
    public List<Order> findByCustomerId(Long userId);

    // Tìm tất cả các đơn hàng đổ về một nhà hàng cụ thể
    public List<Order> findByRestaurantId(Long restaurantId);

    // Kiểm tra xem địa chỉ có được liên kết với đơn hàng nào không
    boolean existsByDeliveryAddressId(Long addressId);

    @Query("SELECT COALESCE(SUM(o.totalPrice), 0) FROM Order o WHERE o.restaurant.id = :restaurantId AND (o.orderStatus = 'COMPLETED' OR o.orderStatus = 'DELIVERED')")
    Long calculateRevenueByRestaurantId(@Param("restaurantId") Long restaurantId);
}