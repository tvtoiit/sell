package com.nhom2.sell_BE.payload.response.lnguyen;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class ProductTypeResponse {

    private String productTypeId;

    private String name;

    private List<ProductResponse> products = new ArrayList<>();
}
