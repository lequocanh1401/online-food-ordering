package com.anh.response;

public class MessageResponse {
    private String message;

    // Đây chính là hàm báo lỗi thiếu lúc nãy, ta tự viết tay luôn!
    public void setMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}