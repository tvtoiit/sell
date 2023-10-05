package com.nhom2.sell_BE.payload.response.lnguyen;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class OrderDetailsResponse {

    private String orderDetailsId;

    private String userName;

    private String phoneNumber;

    private String address;

    private int numberProduct;

    private BigDecimal totalMoney;

    private Boolean status;

    private ProductResponse product;
}
