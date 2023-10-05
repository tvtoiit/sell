package com.nhom2.sell_BE.repositories;

import com.nhom2.sell_BE.entities.Product;
import com.nhom2.sell_BE.entities.ProductType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {
    @Query(value = "SELECT p.* FROM tbl_product p JOIN tbl_product_type pt ON p.product_type_id = pt.product_type_id WHERE p.product_type_id = :productTypeId LIMIT 10", nativeQuery = true)
    List<Product> findAllByProductTypeIdWithLimit(@Param("productTypeId") String productTypeId);

    Page<Product> findAllByProductType(ProductType productType, Pageable pageable);

    List<Product> findAllByPriceEquals(BigDecimal price);
    @Query("SELECT p FROM Product p WHERE p.title LIKE %:keyword% OR p.productType.name LIKE %:keyword%")
    List<Product> searchProducts(@Param("keyword") String keyword);
}
