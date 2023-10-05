package com.nhom2.sell_BE.services.impl;


import java.io.ObjectInputFilter.Config;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nhom2.sell_BE.entities.Configuration;
import com.nhom2.sell_BE.entities.ProductType;
import com.nhom2.sell_BE.payload.response.ConfigResponse;
import com.nhom2.sell_BE.payload.response.ProductTypeConfigResponse;
import com.nhom2.sell_BE.payload.response.ProductTypeResponse;
import com.nhom2.sell_BE.repositories.ConfigurationRepository;
import com.nhom2.sell_BE.repositories.ProductTypeRepository;
import com.nhom2.sell_BE.services.productTypeIdservices;

@Service
public class productTypeServiceImpl implements productTypeIdservices {
    @Autowired  
    private ConfigurationRepository configurationRepository;
    @Autowired
    private ProductTypeRepository productTypeRepository;
    @Override
    public ProductTypeConfigResponse getProductType() {
        List<ProductType> productType = productTypeRepository.findAll();
        List<Configuration> configurations = configurationRepository.findAll();
        List<ConfigResponse> configResponse = new ArrayList<>();

        List<ProductTypeResponse> listProductType = new ArrayList<>(); 
        
        if (productType.isEmpty() || configurations.isEmpty()) {
            return null;
        }
        
        for (ProductType item : productType) {
            ProductTypeResponse productTypeResponse = new ProductTypeResponse();   
            productTypeResponse.setProductTypeId(item.getProductTypeId());            
            productTypeResponse.setTypeName(item.getName());
            listProductType.add(productTypeResponse);
        }
        for (Configuration item1 : configurations) {
            ConfigResponse configResponse1 = new ConfigResponse();   
            configResponse1.setConfigId(item1.getConfigId());            
            configResponse1.setConfigName(item1.getName());
            configResponse.add(configResponse1);
        }
        ProductTypeConfigResponse productTypeConfigResponse = new ProductTypeConfigResponse(configResponse, listProductType);
        return productTypeConfigResponse;
    }

}       
