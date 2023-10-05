package com.nhom2.sell_BE.services.lnguyen;

import com.nhom2.sell_BE.entities.Order;
import com.nhom2.sell_BE.payload.request.OrderRequest;
import com.nhom2.sell_BE.payload.response.lnguyen.OrderResponse;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public interface OrderUserService {
    boolean createOrder(OrderRequest orderRequest);
    List<OrderResponse> getAllOrderByUser();
    boolean doesOrderIdExist(String orderId);

}
