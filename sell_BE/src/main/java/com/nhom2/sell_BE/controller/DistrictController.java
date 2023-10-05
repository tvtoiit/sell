package com.nhom2.sell_BE.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nhom2.sell_BE.entities.ProvinceCity;
import com.nhom2.sell_BE.payload.response.DistristResponse;
import com.nhom2.sell_BE.services.DistrictService;

@RestController
@RequestMapping(value = "/api/v1/district")
public class DistrictController {
    @Autowired
    private DistrictService districtService;

    @GetMapping("/{provinceCityId}")
    public ResponseEntity<List<DistristResponse>> getDistrictsByProvinceCityId(
            @PathVariable(name = "provinceCityId") String provinceCityId) {
        // Tạo một đối tượng ProvinceCity từ provinceCityId
        ProvinceCity provinceCity = new ProvinceCity();
        provinceCity.setProvinceCityId(provinceCityId);

        List<DistristResponse> districtResponses = districtService.getAllDistrictsByProvinceCity(provinceCity);

        return new ResponseEntity<>(districtResponses, HttpStatus.OK);
    }

}
