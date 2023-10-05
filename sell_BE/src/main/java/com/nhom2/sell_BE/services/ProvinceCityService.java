package com.nhom2.sell_BE.services;

import java.util.List;

import org.springframework.stereotype.Service;
import com.nhom2.sell_BE.payload.response.ProvinceCityResponse;

@Service
public interface ProvinceCityService {
    List<ProvinceCityResponse> getAllProvinceCity();
}
