package com.nhom2.sell_BE.services;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.nhom2.sell_BE.payload.request.thiennt.ProductAdminRequest;

@Service
public interface ProductAdminService {

  public ResponseEntity<Object> getAllProductAdmin();

  public ResponseEntity<Object> CreateProductAdmin(MultipartFile file, ProductAdminRequest request)throws Exception;

  public ResponseEntity<Object> deleteProductAdmin(String id);

  public ResponseEntity<Object> updateProductAdmin(String id,
      ProductAdminRequest productAdminRequest, MultipartFile file);

}
