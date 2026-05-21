package com.anh.repository;

import com.anh.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    // Tìm nhà hàng theo từ khóa (Tìm ở tên hoặc loại món ăn)
    @Query("SELECT r FROM Restaurant r WHERE lower(r.name) LIKE lower(concat('%', :query, '%')) OR lower(r.cuisineType) LIKE lower(concat('%', :query, '%'))")
    List<Restaurant> findBySearchQuery(String query);

    // Tìm nhà hàng do một người chủ cụ thể tạo ra
    Restaurant findByOwnerId(Long userId);
}