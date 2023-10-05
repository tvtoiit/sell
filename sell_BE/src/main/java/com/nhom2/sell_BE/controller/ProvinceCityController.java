package com.nhom2.sell_BE.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.nhom2.sell_BE.payload.response.ProvinceCityResponse;
import com.nhom2.sell_BE.services.ProvinceCityService;

import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/province")
public class ProvinceCityController {
    
    @Autowired
    private ProvinceCityService provinceCityService;

    @GetMapping
    public ResponseEntity<?> getProvinceCity() {
        List<ProvinceCityResponse> getAll = provinceCityService.getAllProvinceCity();
        return new ResponseEntity<>(getAll, HttpStatus.OK);
    }
}
