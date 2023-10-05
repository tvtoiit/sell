package com.nhom2.sell_BE.payload.response.lnguyen;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProductDetailsResponse {

    private String productId;

    private String title;

    private BigDecimal price;

    private int discount;

    private BigDecimal priceDiscount;

    private int number;

    private String thumbnail;

    private int numberStars;

    private int releaseTime;

    private String description;

    private List<ImgDescResponse> imgDesc;

    private List<DiscountTextResponse> discountText;

    private ConfigResponse config;

    private String productTypeId;
}
