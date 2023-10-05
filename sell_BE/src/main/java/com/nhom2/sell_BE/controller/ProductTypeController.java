package com.nhom2.sell_BE.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.nhom2.sell_BE.services.productTypeIdservices;

@RestController(value = "productType")
@RequestMapping("/api/v1/producttypes")
public class ProductTypeController {
    @Autowired
    private productTypeIdservices productTypeIdservices;

    @GetMapping()
    public ResponseEntity<?> productTypeId() {
        return new ResponseEntity<>(productTypeIdservices.getProductType(), HttpStatus.OK);
    }  
}
