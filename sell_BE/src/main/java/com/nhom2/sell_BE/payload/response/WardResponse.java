package com.nhom2.sell_BE.payload.response;

import com.nhom2.sell_BE.entities.District;
import com.nhom2.sell_BE.entities.Ward;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class WardResponse {
    private String districtId;
    private String name;
    private String type;
    private String district;

    public WardResponse(Ward ward) {
        this.districtId = ward.getDistrictId();
        this.name = ward.getName();
        this.type = ward.getType();
        this.district = ward.getDistrict().getDistrictId();
    }
}
