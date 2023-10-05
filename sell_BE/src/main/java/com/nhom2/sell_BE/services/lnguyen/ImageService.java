package com.nhom2.sell_BE.services.lnguyen;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface ImageService {
    String saveImage(MultipartFile imageFile) throws Exception;

    Resource getImageProductById(String id);

    Resource getImgDescById(String id);
}
