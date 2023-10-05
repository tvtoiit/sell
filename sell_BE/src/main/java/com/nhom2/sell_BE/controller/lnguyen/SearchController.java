package com.nhom2.sell_BE.controller.lnguyen;

import com.nhom2.sell_BE.services.lnguyen.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/search")
public class SearchController {

    @Autowired
    private ProductService productService;

    @GetMapping("")
    public ResponseEntity<?> searchProduct(@RequestParam("keyword") String keyword) {
        return new ResponseEntity<>(productService.searchProduct(keyword), HttpStatus.OK);
    }
}
