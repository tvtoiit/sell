package com.nhom2.sell_BE.services.impl;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.MonthDay;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.nhom2.sell_BE.entities.Configuration;
import com.nhom2.sell_BE.entities.Product;
import com.nhom2.sell_BE.entities.ProductType;
import com.nhom2.sell_BE.payload.request.thiennt.ProductAdminRequest;
import com.nhom2.sell_BE.payload.response.thiennt.ProductAdminResponse;
import com.nhom2.sell_BE.repositories.ConfigurationRepository;
import com.nhom2.sell_BE.repositories.ProductRepository;
import com.nhom2.sell_BE.repositories.ProductTypeRepository;
import com.nhom2.sell_BE.services.ProductAdminService;

@Service
public class ProductAdminServiceImpl implements ProductAdminService {

  private Logger logger = LoggerFactory.getLogger(this.getClass());
  @Value("${sellsmartphone.app.path-image}")
  private String pathImage;

  @Autowired
  private ProductTypeRepository productTypeRepository;

  @Autowired
  private ProductRepository productRepository;

  @Autowired
  private ConfigurationRepository configurationRepository;

  @Override
  public ResponseEntity<Object> getAllProductAdmin() {
    logger.info("ProductAdminServiceImpl: getAllProductAdmin");
    List<Product> products = productRepository.findAll();
    if (products.isEmpty()) {
      return ResponseEntity.noContent().build();
    }
    ProductAdminResponse respone = new ProductAdminResponse();
    List<ProductAdminResponse> lstResponse = new ArrayList<>();
    for (Product product : products) {
      respone = ProductAdminResponse.builder()
          .productId(product.getProductId())
          .productTypeId(product.getProductType().getProductTypeId())
          .configId(product.getConfiguration().getConfigId())
          .createdAt(product.getCreatedAt())
          .description(product.getDescription())
          .discount(product.getDiscount())
          .title(product.getTitle())
          .thumbnail(pathImage + product.getProductId())
          .number(product.getNumber())
          .price(product.getPrice())
          .releaseTime(product.getReleaseTime())
          .updateAt(product.getUpdateAt())
          .build();
      lstResponse.add(respone);
    }
    return ResponseEntity.ok().body(lstResponse);
  }

  @Override
  public ResponseEntity<Object> CreateProductAdmin(MultipartFile file, ProductAdminRequest request) throws Exception {
    logger.info("ProductAdminServiceImpl: CreateProductAdmin");
    Optional<ProductType> productType = productTypeRepository.findById(request.getProductTypeId());
    Optional<Configuration> config = configurationRepository.findById(request.getConfigId());
    String thumbnail = imageConvertString(file);
    if(config.isEmpty() || productType.isEmpty()) {
      return ResponseEntity.noContent().build();
    }
    Product product = Product
        .builder()
 //       .createdAt(LocalDateTime.now())
        .description(request.getDescription())
        .discount(request.getDiscount())
        .number(request.getNumber())
        .price(request.getPrice())
        .releaseTime(request.getReleaseTime())
        .thumbnail(thumbnail)
        .title(request.getTitle())
        .configuration(config.get())
      //  .createdAt(LocalDateTime.now())
        .productType(productType.get()).build();
    productRepository.save(product);
    return ResponseEntity.ok().body("Create Success");
  }

  public static String imageConvertString(MultipartFile imageFile) throws Exception {
    byte[] imageBytes = imageFile.getBytes();
    return Base64.getEncoder().encodeToString(imageBytes);
}

  @Override
  public ResponseEntity<Object> deleteProductAdmin(String id) {
    Optional<Product> product = productRepository.findById(id);
    if(product.isEmpty()) {
      return ResponseEntity.noContent().build();
    }
    productRepository.deleteById(id);;
    return ResponseEntity.ok().body("Delete Success");
  }

  @Override
  public ResponseEntity<Object> updateProductAdmin(String id,
      ProductAdminRequest request, MultipartFile file) {
    Optional<Product> product = productRepository.findById(id);
    Optional<ProductType> productType = productTypeRepository.findById(request.getProductTypeId());
    Optional<Configuration> config = configurationRepository.findById(request.getConfigId());
    if(config.isEmpty() || productType.isEmpty()) {
      return ResponseEntity.noContent().build();
    }
    if(product.isEmpty()) {
      return ResponseEntity.noContent().build();
    }
    if(!file.isEmpty()) {
      try {
        product.get().setThumbnail(imageConvertString(file));
      } catch (Exception e) {
        e.printStackTrace();
      }
    }
    product.get().setTitle(request.getTitle());
    product.get().setCreatedAt(LocalDateTime.now());
    product.get().setDescription(request.getDescription());
    product.get().setDiscount(request.getDiscount());
    product.get().setNumber(request.getNumber());
    product.get().setPrice(request.getPrice());
    product.get().setReleaseTime(request.getReleaseTime());
    product.get().setUpdateAt(LocalDateTime.now());
    product.get().setConfiguration(config.get());
    product.get().setProductType(productType.get());;
    productRepository.save(product.get());
    return ResponseEntity.ok().body("Update Success");
  }
}
