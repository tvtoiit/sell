package com.nhom2.sell_BE.services.impl.lnguyen;

import com.nhom2.sell_BE.payload.request.OrderRequest;
import com.nhom2.sell_BE.payload.request.ProductRequest;
import com.nhom2.sell_BE.entities.Account;
import com.nhom2.sell_BE.entities.Order;
import com.nhom2.sell_BE.entities.OrderDetails;
import com.nhom2.sell_BE.entities.Product;
import com.nhom2.sell_BE.entities.User;
import com.nhom2.sell_BE.exception.DataNotFoundException;
import com.nhom2.sell_BE.payload.response.lnguyen.OrderResponse;
import com.nhom2.sell_BE.repositories.AccountRepository;
import com.nhom2.sell_BE.repositories.OrderDetailsRepository;
import com.nhom2.sell_BE.repositories.OrderRepository;
import com.nhom2.sell_BE.repositories.ProductRepository;
import com.nhom2.sell_BE.repositories.UserRepositories;
import com.nhom2.sell_BE.services.lnguyen.OrderUserService;
import com.nhom2.sell_BE.utils.GetUserUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Component
public class OrderUserServiceImpl implements OrderUserService {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private OrderDetailsRepository orderDetailsRepository;

    @Autowired
    private UserRepositories userRepository;

    @Override
    public List<OrderResponse> getAllOrderByUser() {
        User user = getUser();
        List<Order> orders = orderRepository.findAllByUser(user);

        return orders.stream().map(OrderResponse::new).collect(Collectors.toList());
    }

    public User getUser(){
        Account account = accountRepository.findByusername(new GetUserUtil().GetUserName());
        User user = userRepository.findById(account.getUser().getUserId()).orElseThrow(()->new DataNotFoundException("User does not exist"));
        return user;
    }

    public static String generateRandomInvoice(String provinceCode) {
        StringBuilder invoice = new StringBuilder(provinceCode);
        invoice.append("HD_");
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        Random random = new Random();

        for (int i = 0; i < 10; i++) {
            int index = random.nextInt(characters.length());
            char randomChar = characters.charAt(index);
            invoice.append(randomChar);
        }

        return invoice.toString();
    }

    @Override
    public boolean doesOrderIdExist(String orderId) {
        return orderRepository.existsByOrderId(orderId);
    }

    @Override
    public boolean createOrder(OrderRequest orderRequest) {
        try {
            String idOrder;
            do {
                idOrder = generateRandomInvoice(orderRequest.getProvinceId());
            } while(doesOrderIdExist(idOrder));
            Order order = new Order();
            order.setOrderId(idOrder);
            order.setAddress(orderRequest.getAddress());
            order.setPhoneNumber(orderRequest.getPhoneNumber());
            order.setUser(getUser());
            order.setCreatedAt(LocalDateTime.now());
            order.setGender(orderRequest.isGender());
            order.setUserName(getUser().getFullName());
            orderRepository.save(order);
            
            for (ProductRequest productRequest : orderRequest.getProduct()) {
                Product product = productRepository.findById(productRequest.getProductId()).orElseThrow(null);
                OrderDetails orderDetails = new OrderDetails();
                orderDetails.setProduct(product);
                orderDetails.setNumberProduct(productRequest.getNumber());
                orderDetails.setCreatedAt(LocalDateTime.now());
                orderDetails.setOrder(order);
                BigDecimal numberProduct = new BigDecimal(productRequest.getNumber());
                BigDecimal totalMoney = product.getPrice().multiply(numberProduct);
                orderDetails.setTotalMoney(totalMoney);
                orderDetails.setStatus(true);
                orderDetailsRepository.save(orderDetails);
            }
            return true;
        } catch( Exception e ) {
            return false;
        }
    }
}
