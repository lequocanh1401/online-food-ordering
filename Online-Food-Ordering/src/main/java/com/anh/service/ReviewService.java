package com.anh.service;

import com.anh.model.Review;
import com.anh.model.User;
import com.anh.dto.ReviewResponseDto;

public interface ReviewService {
    Review createReview(Review review, User user, Long restaurantId, Long foodId) throws Exception;
    
    ReviewResponseDto getRestaurantReviews(Long restaurantId);
    
    ReviewResponseDto getFoodReviews(Long foodId);

    Review updateReview(Long reviewId, Review updatedReview, User user) throws Exception;

    void deleteReview(Long reviewId, User user) throws Exception;
}
