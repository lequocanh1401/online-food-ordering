package com.anh.controller;

import com.anh.dto.RestaurantDto;
import com.anh.model.Restaurant;
import com.anh.model.User;
import com.anh.service.RestaurantService;
import com.anh.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
public class RestaurantController {

    @Autowired
    private RestaurantService restaurantService;
    @Autowired
    private UserService userService;

    @GetMapping("/search")
    public ResponseEntity<List<Restaurant>> searchRestaurant(
            @RequestParam String keyword) throws Exception {
        // Đã gỡ bỏ biến jwt thừa thãi
        List<Restaurant> restaurant = restaurantService.searchRestaurant(keyword);
        return new ResponseEntity<>(restaurant, HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<List<Restaurant>> getAllRestaurant() throws Exception {
        // Khách chưa đăng nhập vẫn gọi được API này bình thường
        List<Restaurant> restaurant = restaurantService.getAllRestaurant();
        return new ResponseEntity<>(restaurant, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Restaurant> findRestaurantById(
            @PathVariable Long id) throws Exception {
        // Đã gỡ bỏ biến jwt thừa thãi
        Restaurant restaurant = restaurantService.findRestaurantById(id);
        return new ResponseEntity<>(restaurant, HttpStatus.OK);
    }

    @PutMapping("/{id}/add-favorites")
    public ResponseEntity<RestaurantDto> addToFavorites(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long id) throws Exception {
        // CHÚ Ý: Chức năng thả tim thì VẪN PHẢI BẮT BUỘC có JWT để biết ai thả tim
        User user = userService.findUserByJwtToken(jwt);
        RestaurantDto restaurantDto = restaurantService.addToFavorites(id, user);
        return new ResponseEntity<>(restaurantDto, HttpStatus.OK);
    }
}