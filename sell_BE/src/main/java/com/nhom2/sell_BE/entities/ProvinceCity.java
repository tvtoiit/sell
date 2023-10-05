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
@Table(name = "devvn_province_city")
public class ProvinceCity implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "province_city_id", length = 2, nullable = false)
    private String provinceCityId;

    @Column(name = "name", columnDefinition = "VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci", nullable = false)
    private String name;

    @Column(name = "type", columnDefinition = "VARCHAR(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci", nullable = false)
    private String type;

    @OneToMany(mappedBy="provinceCity")
    private Set<District> districts = new HashSet<>();
}
