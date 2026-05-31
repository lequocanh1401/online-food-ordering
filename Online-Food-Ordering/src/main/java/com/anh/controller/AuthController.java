package com.anh.controller;

import com.anh.config.JwtProvider;
import com.anh.model.Cart;
import com.anh.model.USER_ROLE;
import com.anh.model.User;
import com.anh.repository.CartRepository;
import com.anh.repository.UserRepository;
import com.anh.request.LoginRequest;
import com.anh.response.AuthResponse;
import com.anh.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtProvider jwtProvider;
    @Autowired
    private CustomUserDetailsService customUserDetailsService;
    @Autowired
    private CartRepository cartRepository;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) throws Exception {

        User isEmailExist = userRepository.findByEmail(user.getEmail());
        if (isEmailExist != null) {
            throw new Exception("Email is already used with another account");
        }

        User createdUser = new User();
        createdUser.setEmail(user.getEmail());
        createdUser.setFullName(user.getFullName());
        if (user.getRole() == USER_ROLE.ROLE_ADMIN) {
            throw new Exception("Registration as ADMIN is not allowed.");
        }
        createdUser.setRole(user.getRole() != null ? user.getRole() : USER_ROLE.ROLE_CUSTOMER);
        createdUser.setPassword(passwordEncoder.encode(user.getPassword()));

        User savedUser = userRepository.save(createdUser);

        // Tạo giỏ hàng trống ngay khi user đăng ký
        Cart cart = new Cart();
        cart.setCustomer(savedUser);
        cartRepository.save(cart);

        UserDetails userDetails = customUserDetailsService.loadUserByUsername(savedUser.getEmail());
        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtProvider.generateToken(authentication);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setMessage("Register success");
        authResponse.setRole(savedUser.getRole());

        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signin(@RequestBody LoginRequest req) {

        String username = req.getEmail();
        String password = req.getPassword();

        Authentication authentication = authenticate(username, password);

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        String role = authorities.isEmpty() ? null : authorities.iterator().next().getAuthority();

        String jwt = jwtProvider.generateToken(authentication);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setMessage("Login success");
        authResponse.setRole(USER_ROLE.valueOf(role));

        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }

    @PostMapping("/google")
    public ResponseEntity<AuthResponse> googleLogin(@RequestBody java.util.Map<String, String> request) throws Exception {
        String idToken = request.get("token");
        if (idToken == null || idToken.isEmpty()) {
            throw new Exception("Token is required");
        }

        // Hỗ trợ chế độ Demo cho môi trường Test/Local development
        if (idToken.startsWith("demo:")) {
            String[] parts = idToken.split(":");
            String email = parts[1];
            String name = parts.length > 2 ? parts[2] : email.split("@")[0];
            return handleSocialLogin(email, name);
        }

        String googleUrl = "https://oauth2.googleapis.com/tokeninfo?id_token=" + idToken;
        org.springframework.web.client.RestTemplate restTemplate = new org.springframework.web.client.RestTemplate();
        
        try {
            @SuppressWarnings("unchecked")
            java.util.Map<String, Object> payload = restTemplate.getForObject(googleUrl, java.util.Map.class);
            if (payload == null || payload.containsKey("error_description")) {
                throw new Exception("Invalid Google Token");
            }

            String email = (String) payload.get("email");
            String name = (String) payload.get("name");

            return handleSocialLogin(email, name);
        } catch (Exception e) {
            throw new Exception("Google Authentication Failed: " + e.getMessage());
        }
    }

    @PostMapping("/facebook")
    public ResponseEntity<AuthResponse> facebookLogin(@RequestBody java.util.Map<String, String> request) throws Exception {
        String accessToken = request.get("token");
        if (accessToken == null || accessToken.isEmpty()) {
            throw new Exception("Token is required");
        }

        // Hỗ trợ chế độ Demo cho môi trường Test/Local development
        if (accessToken.startsWith("demo:")) {
            String[] parts = accessToken.split(":");
            String email = parts[1];
            String name = parts.length > 2 ? parts[2] : email.split("@")[0];
            return handleSocialLogin(email, name);
        }

        String facebookUrl = "https://graph.facebook.com/me?fields=id,name,email&access_token=" + accessToken;
        org.springframework.web.client.RestTemplate restTemplate = new org.springframework.web.client.RestTemplate();

        try {
            @SuppressWarnings("unchecked")
            java.util.Map<String, Object> payload = restTemplate.getForObject(facebookUrl, java.util.Map.class);
            if (payload == null || payload.containsKey("error")) {
                throw new Exception("Invalid Facebook Token");
            }

            String email = (String) payload.get("email");
            String name = (String) payload.get("name");

            if (email == null || email.isEmpty()) {
                email = (String) payload.get("id") + "@facebook.com";
            }

            return handleSocialLogin(email, name);
        } catch (Exception e) {
            throw new Exception("Facebook Authentication Failed: " + e.getMessage());
        }
    }

    private ResponseEntity<AuthResponse> handleSocialLogin(String email, String name) throws Exception {
        User user = userRepository.findByEmail(email);
        boolean isNewUser = false;
        
        if (user == null) {
            isNewUser = true;
            user = new User();
            user.setEmail(email);
            user.setFullName(name != null ? name : email.split("@")[0]);
            user.setRole(USER_ROLE.ROLE_CUSTOMER);
            user.setPassword(passwordEncoder.encode(java.util.UUID.randomUUID().toString()));
            user = userRepository.save(user);

            Cart cart = new Cart();
            cart.setCustomer(user);
            cartRepository.save(cart);
        }

        UserDetails userDetails = customUserDetailsService.loadUserByUsername(user.getEmail());
        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtProvider.generateToken(authentication);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setMessage(isNewUser ? "Social Register Success" : "Social Login Success");
        authResponse.setRole(user.getRole());

        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }

    private Authentication authenticate(String username, String password) {
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);

        if (userDetails == null) {
            throw new BadCredentialsException("Invalid username...");
        }
        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Invalid password...");
        }

        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }
}