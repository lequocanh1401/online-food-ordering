package com.anh.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Coupon {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String code;
    private String discountType; // "PERCENTAGE" or "FLAT"
    private Long discountValue;
    private boolean active = true;

    private Long minimumOrderValue = 0L;

    @ManyToOne
    @JsonIgnoreProperties({"owner", "orders", "foods", "images"})
    private Restaurant restaurant;
}
