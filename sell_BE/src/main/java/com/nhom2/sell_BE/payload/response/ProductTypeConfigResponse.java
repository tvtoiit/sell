package com.nhom2.sell_BE.payload.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class ProductTypeConfigResponse {
    private List<ConfigResponse> config;    
    private List<ProductTypeResponse> productType;
}
