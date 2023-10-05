package com.nhom2.sell_BE.controller.lnguyen;

import com.nhom2.sell_BE.services.lnguyen.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping(value = "/api/v1/image")
public class ShowImageController {

    @Autowired
    private ImageService imageService;

    @GetMapping("/{id}")
    public ResponseEntity<Resource> getImageById(@PathVariable String id) throws IOException {
        Resource imageResource = imageService.getImageProductById(id);
        if (imageResource != null) {
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(imageResource);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("img-desc/{id}")
    public ResponseEntity<Resource> getImgDescById(@PathVariable String id) {
        Resource imageResource = imageService.getImgDescById(id);
        if (imageResource != null) {
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(imageResource);
        }
        return ResponseEntity.notFound().build();
    }

}
