package com.anh.service;

import com.anh.model.*;
import com.anh.repository.*;
import com.anh.request.CreateOrderRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderItemRepository orderItemRepository;
    @Autowired
    private AddressRepository addressRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RestaurantService restaurantService;
    @Autowired
    private CartService cartService;

    @Override
    public Order createOrder(CreateOrderRequest orderReq, User user) throws Exception {
        // Nạp managedUser để chạy trong Persistence Context/Session giao dịch hiện tại
        User managedUser = userRepository.findById(user.getId())
                .orElseThrow(() -> new Exception("User not found"));

        // Lấy giỏ hàng hiện tại của User trước để kiểm tra và lấy thông tin nhà hàng
        Cart cart = cartService.findCartByUserId(user.getId());
        if (cart == null || cart.getItem().isEmpty()) {
            throw new Exception("Cart is empty or not found");
        }

        // Tự động phân tích lấy Restaurant trực tiếp từ món ăn trong giỏ ở phía Backend
        Restaurant restaurant = null;
        CartItem firstCartItem = cart.getItem().get(0);
        if (firstCartItem.getFood() != null) {
            restaurant = firstCartItem.getFood().getRestaurant();
        }

        // Nếu giỏ hàng không có món nào hợp lệ hoặc lỗi, fallback về restaurantId từ frontend gửi lên
        if (restaurant == null && orderReq.getRestaurantId() != null) {
            restaurant = restaurantService.findRestaurantById(orderReq.getRestaurantId());
        }

        if (restaurant == null) {
            throw new Exception("Restaurant not found for this order");
        }

        // 1. Lưu địa chỉ giao hàng trước
        Address shippingAddress = orderReq.getDeliveryAddress();
        Address savedAddress = addressRepository.save(shippingAddress);

        if(!managedUser.getAddresses().contains(savedAddress)){
            managedUser.getAddresses().add(savedAddress);
            userRepository.save(managedUser);
        }

        // 2. Khởi tạo thực thể Order
        Order createdOrder = new Order();
        createdOrder.setCustomer(managedUser);
        createdOrder.setCreatedAt(new Date());
        createdOrder.setOrderStatus("PENDING");
        createdOrder.setDeliveryAddress(savedAddress);
        createdOrder.setRestaurant(restaurant);

        createdOrder.setTotalAmount(cart.getTotal());

        List<OrderItem> orderItems = new ArrayList<>();

        for(CartItem cartItem : cart.getItem()) { // Sử dụng cart.getItems() nếu Model của bạn đặt số nhiều
            OrderItem orderItem = new OrderItem();
            orderItem.setFood(cartItem.getFood());
            
            // Copy danh sách nguyên liệu sang thực thể mới để tránh lỗi chia sẻ bộ sưu tập của Hibernate
            if (cartItem.getIngredients() != null) {
                orderItem.setIngredients(new ArrayList<>(cartItem.getIngredients()));
            } else {
                orderItem.setIngredients(new ArrayList<>());
            }
            
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setTotalPrice(cartItem.getTotalPrice());

            OrderItem savedOrderItem = orderItemRepository.save(orderItem);
            orderItems.add(savedOrderItem);
        }

        Long totalPrice = cartService.calculateCartTotals(cart);
        createdOrder.setItems(orderItems);
        createdOrder.setTotalPrice(totalPrice);

        Order savedOrder = orderRepository.save(createdOrder);

        // Làm sạch giỏ hàng của User sau khi đặt hàng thành công
        cartService.clearCart(user.getId());

        return savedOrder;
    }

    @Override
    public Order updateOrder(Long orderId, String orderStatus) throws Exception {
        Order order = findOrderById(orderId);
        if(orderStatus.equals("OUT_FOR_DELIVERY") ||
                orderStatus.equals("DELIVERED") ||
                orderStatus.equals("COMPLETED") ||
                orderStatus.equals("PENDING") ||
                orderStatus.equals("PAID")) {
            order.setOrderStatus(orderStatus);
            return orderRepository.save(order);
        }
        throw new Exception("Please select a valid order status");
    }

    @Override
    public void cancelOrder(Long orderId) throws Exception {
        Order order = findOrderById(orderId);
        if (!"PENDING".equals(order.getOrderStatus())) {
            throw new Exception("Chỉ có thể hủy/xóa đơn hàng chưa thanh toán.");
        }
        orderRepository.deleteById(orderId);
    }

    @Override
    public List<Order> getUsersOrder(Long userId) throws Exception {
        return orderRepository.findByCustomerId(userId);
    }

    @Override
    public List<Order> getRestaurantsOrder(Long restaurantId, String orderStatus) throws Exception {
        List<Order> orders = orderRepository.findByRestaurantId(restaurantId);
        if(orderStatus != null) {
            orders = orders.stream().filter(order -> order.getOrderStatus().equals(orderStatus)).toList();
        }
        return orders;
    }

    @Override
    public Order findOrderById(Long orderId) throws Exception {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if(optionalOrder.isEmpty()) {
            throw new Exception("Order not found");
        }
        return optionalOrder.get();
    }
}