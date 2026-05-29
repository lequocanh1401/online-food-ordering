package com.anh.dto;

import com.anh.model.Review;
import lombok.Data;
import java.util.List;

@Data
public class ReviewResponseDto {
    private List<Review> reviews;
    private double averageRating;
    private int totalReviews;
}
