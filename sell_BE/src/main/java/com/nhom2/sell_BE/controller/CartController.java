package com.nhom2.sell_BE.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.nhom2.sell_BE.entities.cart;
import com.nhom2.sell_BE.payload.request.cartRequest;
import com.nhom2.sell_BE.payload.response.cartResponse;
import com.nhom2.sell_BE.services.cartService;

@RestController
@RequestMapping("/api/v1/cart")
public class CartController {
    @Autowired
    private final cartService cartService;

    public CartController(cartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/add")
    public ResponseEntity<cartResponse> addToCart(@RequestBody cartRequest request) {
        cartResponse response = cartService.addToCart(request);
        return ResponseEntity.ok(response);
    }

        @PostMapping("/remove-from-cart")
    public ResponseEntity<cartResponse> removeFromCart(@RequestBody cartRequest request,
                                    @RequestParam String productId) {
        cartResponse response = cartService.removeFromCart(request, productId);
        return ResponseEntity.ok(response);
    }

        @GetMapping("/get-cart-items")
    public ResponseEntity<List<cart>> getCartItems() {
        List<cart> cartItems = cartService.getCartItems();
        return ResponseEntity.ok(cartItems);
    }
}
