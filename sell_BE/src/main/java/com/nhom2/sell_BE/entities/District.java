package com.nhom2.sell_BE.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "devvn_district")
public class District implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "district_id", length = 4, nullable = false)
    private String districtId;

    @Column(name = "name", columnDefinition = "VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci", nullable = false)
    private String name;

    @Column(name = "type", columnDefinition = "VARCHAR(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci", nullable = false)
    private String type;

    @ManyToOne
    @JoinColumn(name = "province_city_id", referencedColumnName = "province_city_id")
    private ProvinceCity provinceCity;

    @OneToMany(mappedBy="district")
    private Set<Ward> wards = new HashSet<>();
}
