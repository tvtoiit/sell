package com.nhom2.sell_BE.payload.response;

import com.nhom2.sell_BE.entities.ProvinceCity;
import java.util.List;
import java.util.stream.Collectors;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class ProvinceCityResponse {
    private String provinceCityId;
    private String name;
    private String type;
    //private List<DistristResponse> districts;

    public ProvinceCityResponse(ProvinceCity provinceCity) {
        this.provinceCityId = provinceCity.getProvinceCityId();
        this.name = provinceCity.getName();
        this.type = provinceCity.getType();
    
        // Chuyển đổi danh sách District thành danh sách DistrictResponse
        // this.districts = provinceCity.getDistricts().stream()
        //     .map(DistristResponse::new)
        //     .collect(Collectors.toList());
    }
    
}
