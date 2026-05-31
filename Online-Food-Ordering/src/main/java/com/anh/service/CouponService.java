package com.anh.service;

import com.anh.model.Coupon;
import java.util.List;

public interface CouponService {
    Coupon createCoupon(Coupon coupon, Long restaurantId) throws Exception;
    Coupon createGlobalCoupon(Coupon coupon) throws Exception;
    void deleteCoupon(Long couponId) throws Exception;
    List<Coupon> getRestaurantCoupons(Long restaurantId) throws Exception;
    Coupon findCouponByCode(String code, Long restaurantId) throws Exception;
    List<Coupon> getAllCoupons() throws Exception;
}
