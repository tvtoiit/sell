package com.nhom2.sell_BE.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nhom2.sell_BE.entities.District;
import com.nhom2.sell_BE.payload.response.DistristResponse;
import com.nhom2.sell_BE.payload.response.WardResponse;
import com.nhom2.sell_BE.services.WardService;

@RestController
@RequestMapping(value = "/api/v1/wrad")
public class WradController {
    @Autowired
    private WardService wardService;

    @GetMapping("/{districtId}")
    public ResponseEntity<List<WardResponse>> getAllWardByDitrict(@PathVariable (name = "districtId") String districtId) {
        District district = new District();
        district.setDistrictId(districtId);

        List<WardResponse> wardResponses = wardService.getAllDistrictByIdWrad(district);
        return new ResponseEntity<>(wardResponses, HttpStatus.OK);
    }
}
