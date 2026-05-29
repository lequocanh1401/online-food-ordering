package com.anh.repository;

import com.anh.model.Events;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EventsRepository extends JpaRepository<Events, Long> {
    List<Events> findByRestaurantId(Long id);
}
