package com.anh.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
// CHẶN JACKSON ĐỤNG VÀO RESTAURANT NGAY TỪ CỬA LỚP
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "restaurant"})
public class IngredientsItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne
    // Chặn luôn việc category tự động lôi danh sách nguyên liệu ra gây lặp vòng
    @JsonIgnoreProperties({"ingredients", "restaurant"})
    private IngredientCategory category;

    @JsonIgnore
    @ManyToOne
    private Restaurant restaurant;

    @JsonProperty("inStoke")
    private boolean inStock = true;
}