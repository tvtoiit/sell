package com.nhom2.sell_BE.payload.response.lnguyen;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.nhom2.sell_BE.entities.Order;
import com.nhom2.sell_BE.entities.OrderDetails;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class OrderResponse {

    private String orderId;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    private List<OrderDetailsResponse> orderDetails;

    public OrderResponse(Order order){
        String pathImage = "http://localhost:8888/api/v1/image/";
        this.orderId = order.getOrderId();
        this.createdAt = order.getCreatedAt();
        List<OrderDetailsResponse> orderDetails = new ArrayList<>();
        for(OrderDetails item : order.getOrderDetails()){
            OrderDetailsResponse response = new OrderDetailsResponse();
            response.setOrderDetailsId(item.getOrderDetailsId());
            response.setNumberProduct(item.getNumberProduct());
            response.setTotalMoney(item.getTotalMoney());
            response.setStatus(item.getStatus());

            ProductResponse productResponse = new ProductResponse();
            productResponse.setProductId(item.getProduct().getProductId());
            productResponse.setTitle(item.getProduct().getTitle());
            productResponse.setThumbnail(pathImage + item.getProduct().getProductId());
            //priceDiscount = price - (price * discount)/100
            BigDecimal discountDecimal = new BigDecimal(item.getProduct().getDiscount());
            BigDecimal hundred = new BigDecimal(100);
            productResponse.setPriceDiscount(item.getProduct().getPrice().subtract(item.getProduct().getPrice().multiply(discountDecimal).divide(hundred)));

            response.setProduct(productResponse);

            orderDetails.add(response);
        }
        this.orderDetails = orderDetails;
    }
}
