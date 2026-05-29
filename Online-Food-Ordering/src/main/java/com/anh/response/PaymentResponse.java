package com.anh.response;

import lombok.Data;

@Data
public class PaymentResponse {
    // Tên biến viết thường cách nhau dấu gạch dưới để khớp chính xác với React của Zosh
    private String payment_url;
}