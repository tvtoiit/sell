package com.nhom2.sell_BE.services.impl.lnguyen;

import com.nhom2.sell_BE.entities.*;
import com.nhom2.sell_BE.exception.DataNotFoundException;
import com.nhom2.sell_BE.payload.response.lnguyen.*;
import com.nhom2.sell_BE.repositories.CommentRepository;
import com.nhom2.sell_BE.repositories.ProductRepository;
import com.nhom2.sell_BE.repositories.ProductTypeRepository;
import com.nhom2.sell_BE.services.lnguyen.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    @Value("${sellsmartphone.app.path-image}")
    private String pathImage;

    @Value("${sellsmartphone.app.path-img-desc}")
    private String pathImgDesc;

    @Autowired
    private ProductTypeRepository productTypeRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Override
    public List<ProductTypeResponse> getAllProductByProductType() {
        List<ProductType> productTypes = productTypeRepository.findAll();
        if(productTypes.isEmpty()){
            return null;
        }
        List<ProductTypeResponse> productTypeResponses = new ArrayList<>();
        for (ProductType item : productTypes){
            List<Product> products = productRepository.findAllByProductTypeIdWithLimit(item.getProductTypeId());
            productTypeResponses.add(setupResponse(item, products));
        }
        return productTypeResponses;
    }

    @Override
    public Page<ProductResponse> getAllProductByProductTypeSeeMore(String productTypeId, int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by("createdAt").descending());
        ProductType productType = productTypeRepository.findById(productTypeId).orElseThrow(()->new DataNotFoundException("Product Type Not Found"));

        Page<Product> products = productRepository.findAllByProductType(productType , pageable);

        return products.map(product -> {
            List<Comment> comments = commentRepository.findAllByProduct(product);
            String thumbnail = pathImage + product.getProductId();
            int numberStars = 0;
            int totalStars = 0;
            if(comments.isEmpty()){
                numberStars = 5;
            }else {
                for (Comment comment : comments){
                    totalStars += comment.getNumberStars();
                }
                numberStars = totalStars/comments.size();
            }
            return new ProductResponse(product, thumbnail, numberStars);
        });
    }

    @Override
    public ProductDetailsResponse getProductDetails(String productId) {

        Product product = productRepository.findById(productId).orElseThrow(()->new DataNotFoundException("Product Not Found"));

        String thumbnail = pathImage + product.getProductId();

        List<Comment> comments = commentRepository.findAllByProduct(product);
        int numberStars = 0;
        int totalStars = 0;
        if(comments.isEmpty()){
            numberStars = 5;
        }else {
            for (Comment comment : comments){
                totalStars += comment.getNumberStars();
            }
            numberStars = totalStars/comments.size();
        }
        BigDecimal discountDecimal = new BigDecimal(product.getDiscount());
        BigDecimal hundred = new BigDecimal(100);
        ProductDetailsResponse productDetails = new ProductDetailsResponse();
        productDetails.setProductId(product.getProductId());
        productDetails.setTitle(product.getTitle());
        productDetails.setNumber(product.getNumber());
        productDetails.setPrice(product.getPrice());
        productDetails.setDiscount(product.getDiscount());
        productDetails.setPriceDiscount(product.getPrice().subtract(product.getPrice().multiply(discountDecimal).divide(hundred)));
        productDetails.setThumbnail(thumbnail);
        productDetails.setNumberStars(numberStars);
        productDetails.setReleaseTime(product.getReleaseTime());
        productDetails.setProductTypeId(product.getProductType().getProductTypeId());

        List<ImgDescResponse> listImgDesc = new ArrayList<>();
        for(ImgDesc item : product.getImgDesc()){
            ImgDescResponse imgDesc = new ImgDescResponse();
            String pathImg = pathImgDesc + item.getImageId();
            imgDesc.setImageId(item.getImageId());
            imgDesc.setImage(pathImg);
            listImgDesc.add(imgDesc);
        }
        productDetails.setImgDesc(listImgDesc);

        List<DiscountTextResponse> discountTextResponses = new ArrayList<>();
        for (DiscountText item : product.getDiscountTexts()){
            DiscountTextResponse discountText = new DiscountTextResponse();
            discountText.setDiscountId(item.getDiscountId());
            discountText.setDiscountText(item.getDiscountText());
            discountTextResponses.add(discountText);
        }
        productDetails.setDiscountText(discountTextResponses);

        ConfigResponse config = new ConfigResponse();
        config.setConfigId(product.getConfiguration().getConfigId());
        config.setScreen(product.getConfiguration().getScreen());
        config.setOperatingSys(product.getConfiguration().getOperatingSys());
        config.setFrontCamera(product.getConfiguration().getFrontCamera());
        config.setRearCamera(product.getConfiguration().getRearCamera());
        config.setChip(product.getConfiguration().getChip());
        config.setRam(product.getConfiguration().getRam());
        config.setSim(product.getConfiguration().getSim());
        config.setPin(product.getConfiguration().getPin());

        productDetails.setConfig(config);

        return productDetails;
    }

    @Override
    public List<ProductResponse> searchProduct(String keyword) {
        BigDecimal price = null;
        try {
            price = new BigDecimal(keyword);
        } catch (NumberFormatException e) {
            // Xử lý lỗi nếu từ khóa không phải là số hợp lệ
            List<Product> products = productRepository.searchProducts(keyword);
            products.sort(Comparator.comparing(Product::getTitle));
            return products.stream().map(product -> {
                List<Comment> comments = commentRepository.findAllByProduct(product);
                String thumbnail = pathImage + product.getProductId();
                int numberStars = 0;
                int totalStars = 0;
                if(comments.isEmpty()){
                    numberStars = 5;
                }else {
                    for (Comment comment : comments){
                        totalStars += comment.getNumberStars();
                    }
                    numberStars = totalStars/comments.size();
                }
                return new ProductResponse(product, thumbnail, numberStars);
            }).collect(Collectors.toList());
        }
        List<Product> products = productRepository.findAllByPriceEquals(price);
        products.sort(Comparator.comparing(Product::getPrice));
        return products.stream().map(product -> {
            List<Comment> comments = commentRepository.findAllByProduct(product);
            String thumbnail = pathImage + product.getProductId();
            int numberStars = 0;
            int totalStars = 0;
            if(comments.isEmpty()){
                numberStars = 5;
            }else {
                for (Comment comment : comments){
                    totalStars += comment.getNumberStars();
                }
                numberStars = totalStars/comments.size();
            }
            return new ProductResponse(product, thumbnail, numberStars);
        }).collect(Collectors.toList());
    }

    public ProductTypeResponse setupResponse(ProductType item, List<Product> products){
        ProductTypeResponse productTypeResponse = new ProductTypeResponse();
        if(products.isEmpty());
        else {
            productTypeResponse.setProductTypeId(item.getProductTypeId());
            productTypeResponse.setName(item.getName());
            List<ProductResponse> productResponses = new ArrayList<>();
            for (Product itemProduct : products){
                String thumbnail = pathImage + itemProduct.getProductId();
                List<Comment> comments = commentRepository.findAllByProduct(itemProduct);
                int numberStars = 0;
                int totalStars = 0;
                if(comments.isEmpty()){
                    numberStars = 5;
                }else {
                    for (Comment comment : comments){
                        totalStars += comment.getNumberStars();
                    }
                    numberStars = totalStars/comments.size();
                }
                BigDecimal discountDecimal = new BigDecimal(itemProduct.getDiscount());
                BigDecimal hundred = new BigDecimal(100);

                ProductResponse productResponse = new ProductResponse();
                productResponse.setProductId(itemProduct.getProductId());
                productResponse.setTitle(itemProduct.getTitle());
                productResponse.setConfig(itemProduct.getConfiguration().getConfigId());
                productResponse.setPrice(itemProduct.getPrice());
                productResponse.setNumber(itemProduct.getNumber());
                productResponse.setThumbnail(thumbnail);
                productResponse.setDiscount(itemProduct.getDiscount());
                productResponse.setPriceDiscount(itemProduct.getPrice().subtract(itemProduct.getPrice().multiply(discountDecimal).divide(hundred)));
                productResponse.setNumberStars(numberStars);
                productResponse.setReleaseTime(itemProduct.getReleaseTime());
                productResponse.setDescription(itemProduct.getDescription());
                productResponses.add(productResponse);
            }
            productTypeResponse.setProducts(productResponses);
        }
        return productTypeResponse;
    }
}
