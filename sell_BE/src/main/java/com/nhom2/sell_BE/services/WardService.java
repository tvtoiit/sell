package com.nhom2.sell_BE.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nhom2.sell_BE.entities.District;
import com.nhom2.sell_BE.payload.response.WardResponse;

@Service
public interface WardService {
    List<WardResponse> getAllDistrictByIdWrad(District district);
}
