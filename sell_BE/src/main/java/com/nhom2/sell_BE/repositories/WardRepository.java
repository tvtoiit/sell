package com.nhom2.sell_BE.repositories;

import com.nhom2.sell_BE.entities.District;
import com.nhom2.sell_BE.entities.Ward;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WardRepository extends JpaRepository<Ward, String> {
    List<Ward> findByDistrict(District district);
}
