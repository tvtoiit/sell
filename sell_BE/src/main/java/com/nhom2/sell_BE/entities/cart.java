package com.nhom2.sell_BE.entities;

import java.io.Serializable;
import java.math.BigDecimal;

import lombok.*;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class cart implements Serializable {
    private String productId;
    private String name;
    private int quantity;
    private BigDecimal price;
    private String image;
}
