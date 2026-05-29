package com.anh.service;

import com.anh.model.Address;
import com.anh.model.User;

public interface UserService {
    public User findUserByJwtToken(String jwt) throws Exception;
    public User findUserByEmail(String email) throws Exception;
    public User addAddressToUser(String jwt, Address address) throws Exception;
    public User deleteAddressFromUser(String jwt, Long addressId) throws Exception;
    public User updateAddress(String jwt, Long addressId, Address addressDetails) throws Exception;
}