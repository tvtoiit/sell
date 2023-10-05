package com.nhom2.sell_BE.payload.response;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class cartResponse {
    private String productId;
    private String name;
    private int quantity;
    private BigDecimal price;
    private String image;
}
