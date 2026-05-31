package com.anh;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.anh.model.Cart;
import com.anh.model.USER_ROLE;
import com.anh.model.User;
import com.anh.repository.CartRepository;
import com.anh.repository.UserRepository;

@SpringBootApplication
public class OnlineFoodOrderingApplication {

	public static void main(String[] args) {
		SpringApplication.run(OnlineFoodOrderingApplication.class, args);
	}

	@Bean
	public CommandLineRunner initAdmin(UserRepository userRepository, CartRepository cartRepository, PasswordEncoder passwordEncoder) {
		return args -> {
			User admin = userRepository.findByEmail("admin");
			if (admin == null) {
				admin = new User();
				admin.setEmail("admin");
				admin.setFullName("Super Admin");
				admin.setPassword(passwordEncoder.encode("admin"));
				admin.setRole(USER_ROLE.ROLE_ADMIN);
				admin = userRepository.save(admin);

				Cart cart = new Cart();
				cart.setCustomer(admin);
				cartRepository.save(cart);
				System.out.println(">>> Đã tự động tạo tài khoản Super Admin (admin / admin) thành công!");
			}
		};
	}

}
