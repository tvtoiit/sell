package com.nhom2.sell_BE.services.lnguyen;

import com.nhom2.sell_BE.payload.response.lnguyen.ProductDetailsResponse;
import com.nhom2.sell_BE.payload.response.lnguyen.ProductResponse;
import com.nhom2.sell_BE.payload.response.lnguyen.ProductTypeResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductService {

    List<ProductTypeResponse> getAllProductByProductType();

    Page<ProductResponse> getAllProductByProductTypeSeeMore(String productTypeId, int pageNumber, int pageSize);

    ProductDetailsResponse getProductDetails(String productId);

    List<ProductResponse> searchProduct(String keyword);
}
