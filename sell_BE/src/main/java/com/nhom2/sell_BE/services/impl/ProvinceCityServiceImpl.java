package com.nhom2.sell_BE.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.nhom2.sell_BE.entities.ProvinceCity;
import com.nhom2.sell_BE.payload.response.DistristResponse;
import com.nhom2.sell_BE.payload.response.ProvinceCityResponse;
import com.nhom2.sell_BE.repositories.ProvinceCityRepository;
import com.nhom2.sell_BE.services.ProvinceCityService;

@Component
public class ProvinceCityServiceImpl implements ProvinceCityService {

    @Autowired
    private ProvinceCityRepository provinceCityRepository;

    @Override
    public List<ProvinceCityResponse> getAllProvinceCity() {
        List<ProvinceCity> listProvince =  provinceCityRepository.findAll();

         List<ProvinceCityResponse> provinceResponses = listProvince.stream()
                .map(ProvinceCityResponse::new) // Sử dụng constructor của DistristResponse
                .collect(Collectors.toList());

     
        return provinceResponses;
    }
    
}
