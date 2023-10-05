package com.nhom2.sell_BE.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.nhom2.sell_BE.entities.District;
import com.nhom2.sell_BE.entities.Ward;
import com.nhom2.sell_BE.payload.response.DistristResponse;
import com.nhom2.sell_BE.payload.response.WardResponse;
import com.nhom2.sell_BE.repositories.WardRepository;
import com.nhom2.sell_BE.services.WardService;

@Component
public class WardServiceImpl implements WardService{

    @Autowired
    private WardRepository wardRepository;

    @Override
    public List<WardResponse> getAllDistrictByIdWrad(District district) {
        List<Ward> listWrad = wardRepository.findByDistrict(district);

        // Sử dụng Java Stream để chuyển đổi từ Ward sang WardResponse
        List<WardResponse> wradResponses = listWrad.stream()
                .map(WardResponse::new) // Sử dụng constructor của DistristResponse
                .collect(Collectors.toList());
        return wradResponses;
    }
    
}
