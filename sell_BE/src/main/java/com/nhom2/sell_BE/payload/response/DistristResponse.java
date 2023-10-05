package com.nhom2.sell_BE.payload.response;

import com.nhom2.sell_BE.entities.District;
import com.nhom2.sell_BE.entities.ProvinceCity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class DistristResponse {
    private String districtId;
    private String name;
    private String type;
    private String provinceCityId;

    public DistristResponse(District district) {
        this.districtId = district.getDistrictId();
        this.name = district.getName();
        this.type = district.getType();
        this.provinceCityId = district.getProvinceCity().getProvinceCityId();
    }
}
