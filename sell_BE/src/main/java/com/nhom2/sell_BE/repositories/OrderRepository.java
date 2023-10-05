package com.nhom2.sell_BE.repositories;

import com.nhom2.sell_BE.entities.Order;
import com.nhom2.sell_BE.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, String> {
    boolean existsByOrderId(String orderId);
    List<Order> findAllByUser(User user);
}
