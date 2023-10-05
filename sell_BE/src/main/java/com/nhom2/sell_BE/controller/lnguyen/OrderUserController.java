package com.nhom2.sell_BE.controller.lnguyen;


import com.nhom2.sell_BE.payload.request.OrderRequest;
import com.nhom2.sell_BE.payload.response.lnguyen.OrderResponse;
import com.nhom2.sell_BE.services.lnguyen.OrderUserService;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/order-user")
public class OrderUserController {

    @Autowired
    private OrderUserService orderUserService;

    @GetMapping("/{orderId}")
    public ResponseEntity<?> getAllOrderByUser(@PathVariable(name = "user") String orderId) {
        List<OrderResponse> getAll = orderUserService.getAllOrderByUser();
        return new ResponseEntity<>(getAll, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createOrder(@RequestBody OrderRequest orderRequest) {
        boolean createdOrder = orderUserService.createOrder(orderRequest);
        String orderResult;
        if (createdOrder) {
             orderResult = "Thanhf cong";
        } else {
             orderResult = "That bai";
        }
        return new ResponseEntity<>(orderResult, HttpStatus.CREATED);
    }
}
