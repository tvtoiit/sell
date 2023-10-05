package com.nhom2.sell_BE.payload.response.lnguyen;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.nhom2.sell_BE.entities.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProductResponse {

    private String productTypeName;

    private String productId;

    private String title;

    private BigDecimal price;

    private int discount;

    private BigDecimal priceDiscount;

    private int number;

    private String thumbnail;

    private int numberStars;

    private String config;

    private int releaseTime;

    private String description;

    public ProductResponse(Product product, String thumbnail, int numberStars){
        this.productTypeName = product.getProductType().getName();
        this.productId = product.getProductId();
        this.title = product.getTitle();
        this.price = product.getPrice();
        this.discount = product.getDiscount();
        this.config = product.getConfiguration().getConfigId();
        //priceDiscount = price - (price * discount)/100
        BigDecimal discountDecimal = new BigDecimal(discount);
        BigDecimal hundred = new BigDecimal(100);
        this.priceDiscount = price.subtract(price.multiply(discountDecimal).divide(hundred));
        this.number = product.getNumber();
        this.thumbnail = thumbnail;
        this.numberStars = numberStars;
        this.releaseTime = product.getReleaseTime();
        this.description = product.getDescription();
    }
}
