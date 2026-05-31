package com.anh.controller;

import com.anh.model.Coupon;
import com.anh.service.CouponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin/coupons")
public class AdminCouponController {

    @Autowired
    private CouponService couponService;

    @PostMapping("/restaurant/{restaurantId}")
    public ResponseEntity<Coupon> createCoupon(@RequestBody Coupon coupon, @PathVariable Long restaurantId) throws Exception {
        Coupon createdCoupon = couponService.createCoupon(coupon, restaurantId);
        return new ResponseEntity<>(createdCoupon, HttpStatus.CREATED);
    }

    @PostMapping("/global")
    public ResponseEntity<Coupon> createGlobalCoupon(@RequestBody Coupon coupon) throws Exception {
        Coupon createdCoupon = couponService.createGlobalCoupon(coupon);
        return new ResponseEntity<>(createdCoupon, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCoupon(@PathVariable Long id) throws Exception {
        couponService.deleteCoupon(id);
        return new ResponseEntity<>("Coupon deleted successfully", HttpStatus.OK);
    }

    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<Coupon>> getRestaurantCoupons(@PathVariable Long restaurantId) throws Exception {
        List<Coupon> coupons = couponService.getRestaurantCoupons(restaurantId);
        return new ResponseEntity<>(coupons, HttpStatus.OK);
    }
}
