package com.nhom2.sell_BE.services;

import java.util.List;

import com.nhom2.sell_BE.entities.cart;
import com.nhom2.sell_BE.payload.request.cartRequest;
import com.nhom2.sell_BE.payload.response.cartResponse;

public interface cartService {
    cartResponse addToCart(cartRequest request);
    cartResponse removeFromCart(cartRequest request, String productId);
    List<cart> getCartItems();

}
