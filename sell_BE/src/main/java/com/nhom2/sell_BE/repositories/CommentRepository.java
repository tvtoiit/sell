package com.nhom2.sell_BE.repositories;

import com.nhom2.sell_BE.entities.Comment;
import com.nhom2.sell_BE.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, String> {
    List<Comment> findAllByProduct(Product product);
}
