package com.nhom2.sell_BE.services;

import java.util.List;
import org.springframework.stereotype.Service;

import com.nhom2.sell_BE.entities.ProvinceCity;
import com.nhom2.sell_BE.payload.response.DistristResponse;

@Service
public interface DistrictService {
    List<DistristResponse> getAllDistrictsByProvinceCity(ProvinceCity provinceCity);
}
