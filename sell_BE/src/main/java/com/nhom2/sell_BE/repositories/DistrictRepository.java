package com.nhom2.sell_BE.repositories;

import com.nhom2.sell_BE.entities.District;
import com.nhom2.sell_BE.entities.ProvinceCity;
import com.nhom2.sell_BE.payload.response.DistristResponse;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface DistrictRepository extends JpaRepository<District, String> {
    List<District> findByProvinceCity(ProvinceCity provinceCity);
}
