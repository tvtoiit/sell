package com.nhom2.sell_BE.payload.response;


import java.time.LocalDateTime;

import com.nhom2.sell_BE.entities.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class OrderResponse {
    private String orderId;
    private LocalDateTime createdAt;
    private User user;
}
