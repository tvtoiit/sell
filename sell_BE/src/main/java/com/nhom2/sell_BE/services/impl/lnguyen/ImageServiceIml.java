package com.nhom2.sell_BE.services.impl.lnguyen;

import com.nhom2.sell_BE.entities.ImgDesc;
import com.nhom2.sell_BE.entities.Product;
import com.nhom2.sell_BE.exception.DataExistException;
import com.nhom2.sell_BE.exception.DataNotFoundException;
import com.nhom2.sell_BE.repositories.ImgDescRepository;
import com.nhom2.sell_BE.repositories.ProductRepository;
import com.nhom2.sell_BE.services.lnguyen.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Base64;

@Service
public class ImageServiceIml implements ImageService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ImgDescRepository imgDescRepository;

    @Override
    public String saveImage(MultipartFile imageFile) throws Exception {
        byte[] imageBytes = imageFile.getBytes();
        return Base64.getEncoder().encodeToString(imageBytes);
    }

    @Override
    public Resource getImageProductById(String id) {
        Product imageProduct = productRepository.findById(id).orElseThrow(()->new DataNotFoundException("Product not found"));
        String base64Data = imageProduct.getThumbnail();
        byte[] imageData = Base64.getDecoder().decode(base64Data);
        return new ByteArrayResource(imageData);
    }

    @Override
    public Resource getImgDescById(String id) {
        ImgDesc imgDesc = imgDescRepository.findById(id).orElseThrow(()->new DataNotFoundException("ImgDesc not found"));

        String base64Data = imgDesc.getImage();
        byte[] imageData = Base64.getDecoder().decode(base64Data);
        return new ByteArrayResource(imageData);
    }
}
