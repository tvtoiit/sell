package com.nhom2.sell_BE.controller.lnguyen;

import com.nhom2.sell_BE.entities.Product;
import com.nhom2.sell_BE.payload.response.lnguyen.ProductResponse;
import com.nhom2.sell_BE.repositories.ProductRepository;
import com.nhom2.sell_BE.services.lnguyen.CommentService;
import com.nhom2.sell_BE.services.lnguyen.ImageService;
import com.nhom2.sell_BE.services.lnguyen.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/v1/product-home")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private ImageService imageService;

    @Autowired
    private CommentService commentService;


    @GetMapping()
    public ResponseEntity<?> getAllProductByProductType() {
        return new ResponseEntity<>(productService.getAllProductByProductType(), HttpStatus.OK);
    }

    @GetMapping("/see-more/{product-type-id}")
    public ResponseEntity<?> getAllProductByProductType(@PathVariable("product-type-id") String productTypeId,
                                                        @RequestParam(value = "pageNumber", defaultValue = "0") int pageNumber, @RequestParam(value = "pageSize", defaultValue = "10") int pageSize) {
        return new ResponseEntity<>(productService.getAllProductByProductTypeSeeMore(productTypeId, pageNumber, pageSize), HttpStatus.OK);
    }

    @GetMapping("/details/{product-id}")
    public ResponseEntity<?> getProductDetails(@PathVariable("product-id") String productId) {
        return new ResponseEntity<>(productService.getProductDetails(productId), HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<?> save(@RequestParam("file") MultipartFile file) throws Exception {

        String img =  imageService.saveImage(file);
        return new ResponseEntity<>(img, HttpStatus.OK);
    }

}
