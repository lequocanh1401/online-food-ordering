package com.anh.controller;

import com.anh.model.Coupon;
import com.anh.service.CouponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/coupons")
public class CouponController {

    @Autowired
    private CouponService couponService;

    @GetMapping("/validate/{code}/restaurant/{restaurantId}")
    public ResponseEntity<Coupon> validateCoupon(@PathVariable String code, @PathVariable Long restaurantId) throws Exception {
        Coupon coupon = couponService.findCouponByCode(code, restaurantId);
        return new ResponseEntity<>(coupon, HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<List<Coupon>> getAllCoupons() throws Exception {
        List<Coupon> coupons = couponService.getAllCoupons();
        return new ResponseEntity<>(coupons, HttpStatus.OK);
    }
}
