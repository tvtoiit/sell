package com.nhom2.sell_BE.controller.lnguyen;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nhom2.sell_BE.services.lnguyen.ConfigServive;

@RestController
@RequestMapping("/api/v1/config")
public class ConfigController {
    @Autowired
    private ConfigServive configServive;

    @GetMapping()
    public ResponseEntity<?> getAllProductByProductType() {
        return new ResponseEntity<>(configServive.getConfig(), HttpStatus.OK);
    }
}
