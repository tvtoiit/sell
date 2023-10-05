package com.nhom2.sell_BE.payload.request;

import java.util.List;
import java.util.ArrayList;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class OrderRequest {
    private String phoneNumber;
    private String address;
    private List<ProductRequest> product = new ArrayList<>();
    private String provinceId;
    private boolean gender;
}
