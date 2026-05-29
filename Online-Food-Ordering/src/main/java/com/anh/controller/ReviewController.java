package com.anh.controller;

import com.anh.dto.ReviewResponseDto;
import com.anh.model.Review;
import com.anh.model.User;
import com.anh.service.ReviewService;
import com.anh.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<?> createReview(
            @RequestBody Review review,
            @RequestHeader("Authorization") String jwt,
            @RequestParam("restaurantId") Long restaurantId,
            @RequestParam(value = "foodId", required = false) Long foodId) {
        try {
            User user = userService.findUserByJwtToken(jwt);
            Review createdReview = reviewService.createReview(review, user, restaurantId, foodId);
            return new ResponseEntity<>(createdReview, HttpStatus.CREATED);
        } catch (Exception e) {
            // Trả về thông báo lỗi chi tiết để frontend hiển thị
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<ReviewResponseDto> getRestaurantReviews(@PathVariable Long restaurantId) {
        ReviewResponseDto response = reviewService.getRestaurantReviews(restaurantId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/food/{foodId}")
    public ResponseEntity<ReviewResponseDto> getFoodReviews(@PathVariable Long foodId) {
        ReviewResponseDto response = reviewService.getFoodReviews(foodId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
