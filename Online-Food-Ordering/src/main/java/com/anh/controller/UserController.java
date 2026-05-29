package com.anh.controller;

import com.anh.model.User;
import com.anh.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<User> findUserByJwtToken(@RequestHeader("Authorization") String jwt) throws Exception {
        // Lấy token từ Header, đưa cho UserService xử lý
        User user = userService.findUserByJwtToken(jwt);

        // Trả về thông tin User kèm mã 200 OK
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}