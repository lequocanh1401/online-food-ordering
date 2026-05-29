package com.anh.service;

import com.anh.config.JwtProvider;
import com.anh.model.Address;
import com.anh.model.User;
import com.anh.repository.AddressRepository;
import com.anh.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private JwtProvider jwtProvider;

    @Override
    public User findUserByJwtToken(String jwt) throws Exception {
        // 1. Dịch token lấy email
        String email = jwtProvider.getEmailFromJwtToken(jwt);
        // 2. Dùng email tìm User trong database
        User user = findUserByEmail(email);
        if (user != null) {
            user.getFavorites().size();
            user.getAddresses().size();
        }
        return user;
    }

    @Override
    public User findUserByEmail(String email) throws Exception {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new Exception("User not found");
        }
        user.getFavorites().size();
        user.getAddresses().size();
        return user;
    }

    @Override
    public User addAddressToUser(String jwt, Address address) throws Exception {
        User user = findUserByJwtToken(jwt);
        Address savedAddress = addressRepository.save(address);
        user.getAddresses().add(savedAddress);
        return userRepository.save(user);
    }

    @Override
    public User deleteAddressFromUser(String jwt, Long addressId) throws Exception {
        User user = findUserByJwtToken(jwt);
        Address addressToRemove = null;
        for (Address addr : user.getAddresses()) {
            if (addr.getId().equals(addressId)) {
                addressToRemove = addr;
                break;
            }
        }
        if (addressToRemove != null) {
            user.getAddresses().remove(addressToRemove);
            return userRepository.save(user);
        } else {
            throw new Exception("Address not found or does not belong to this user");
        }
    }

    @Override
    public User updateAddress(String jwt, Long addressId, Address addressDetails) throws Exception {
        User user = findUserByJwtToken(jwt);
        Address addressToUpdate = null;
        for (Address addr : user.getAddresses()) {
            if (addr.getId().equals(addressId)) {
                addressToUpdate = addr;
                break;
            }
        }
        if (addressToUpdate != null) {
            addressToUpdate.setStreetAddress(addressDetails.getStreetAddress());
            addressToUpdate.setCity(addressDetails.getCity());
            addressToUpdate.setStateProvince(addressDetails.getStateProvince());
            addressToUpdate.setPostalCode(addressDetails.getPostalCode());
            addressToUpdate.setCountry(addressDetails.getCountry());
            addressRepository.save(addressToUpdate);
            return userRepository.save(user);
        } else {
            throw new Exception("Address not found or does not belong to this user");
        }
    }
}