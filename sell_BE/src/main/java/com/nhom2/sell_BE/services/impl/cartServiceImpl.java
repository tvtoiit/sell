package com.nhom2.sell_BE.services.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

import com.nhom2.sell_BE.entities.cart;
import com.nhom2.sell_BE.payload.request.cartRequest;
import com.nhom2.sell_BE.payload.response.cartResponse;
import com.nhom2.sell_BE.services.cartService;

@Service
@SessionScope
public class cartServiceImpl implements cartService {
    private Map<String, cart> cartItems = new HashMap<>();

    public cartResponse addToCart(cartRequest request) {
        if (cartItems.containsKey(request.getProductId())) {
            cart item = cartItems.get(request.getProductId());
            item.setQuantity(item.getQuantity() + request.getQuantity());
            item.setPrice(item.getPrice().add(request.getPrice()));
        } else {
            cart item = new cart(request.getProductId(), request.getName(), request.getQuantity(), request.getPrice(), request.getImage());
            cartItems.put(request.getProductId(),item);
        }

        // Tạo cartResponse từ cart item đã thêm vào giỏ hàng
        cart items= cartItems.get(request.getProductId());
        cartResponse response = new cartResponse(items.getProductId(),items.getName(), items.getQuantity(), items.getPrice(), items.getImage());
        return response;
    }

    public cartResponse removeFromCart(cartRequest request, String productId) {
        cartItems.remove(productId);

        // Tạo cartResponse từ cart item đã xóa khỏi giỏ hàng
        cartResponse response = new cartResponse(null,null, 0, BigDecimal.ZERO, null);
        return response;
    }

    public List<cart> getCartItems() {
        
        return new ArrayList<>(cartItems.values());
    }
}
