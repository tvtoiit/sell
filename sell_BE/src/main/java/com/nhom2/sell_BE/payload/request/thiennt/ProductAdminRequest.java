package com.nhom2.sell_BE.payload.request.thiennt;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import org.springframework.web.multipart.MultipartFile;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductAdminRequest {
  private String title;

  private BigDecimal price;

  private int discount;

  private int number;

  private int releaseTime;

  private String description;

  private String productTypeId;

  private String configId;
//
//  // thumbnail;
//  private MultipartFile file;
}
