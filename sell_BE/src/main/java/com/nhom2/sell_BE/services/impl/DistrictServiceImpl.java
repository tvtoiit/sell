package com.nhom2.sell_BE.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.nhom2.sell_BE.entities.District;
import com.nhom2.sell_BE.entities.ProvinceCity;
import com.nhom2.sell_BE.payload.response.DistristResponse;
import com.nhom2.sell_BE.repositories.DistrictRepository;
import com.nhom2.sell_BE.services.DistrictService;

@Component
public class DistrictServiceImpl implements DistrictService {
    @Autowired
    private DistrictRepository districtRepository;

    @Override
    public  List<DistristResponse> getAllDistrictsByProvinceCity(ProvinceCity provinceCity) {
        List<District> districts = districtRepository.findByProvinceCity(provinceCity);

        // Sử dụng Java Stream để chuyển đổi từ District sang DistristResponse
        List<DistristResponse> districtResponses = districts.stream()
                .map(DistristResponse::new) // Sử dụng constructor của DistristResponse
                .collect(Collectors.toList());

        return districtResponses;
    }
}
