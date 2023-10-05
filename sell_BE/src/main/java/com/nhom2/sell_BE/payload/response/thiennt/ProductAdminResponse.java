package com.nhom2.sell_BE.payload.response.thiennt;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductAdminResponse {
  private String productId;

  private String title;

  private BigDecimal price;

  private int discount;

  private int number;

  private String thumbnail;

  private int releaseTime;

  private String description;

  private LocalDateTime createdAt;

  private LocalDateTime updateAt;

  private String productTypeId;

  private String configId;
}
