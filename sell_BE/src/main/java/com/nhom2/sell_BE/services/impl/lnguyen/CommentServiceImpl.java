package com.nhom2.sell_BE.services.impl.lnguyen;

import com.nhom2.sell_BE.entities.Account;
import com.nhom2.sell_BE.entities.Comment;
import com.nhom2.sell_BE.entities.Product;
import com.nhom2.sell_BE.entities.User;
import com.nhom2.sell_BE.exception.DataNotFoundException;
import com.nhom2.sell_BE.payload.request.CommentRequest;
import com.nhom2.sell_BE.payload.response.lnguyen.CommentResponse;
import com.nhom2.sell_BE.repositories.AccountRepository;
import com.nhom2.sell_BE.repositories.CommentRepository;
import com.nhom2.sell_BE.repositories.ProductRepository;
import com.nhom2.sell_BE.repositories.UserRepositories;
import com.nhom2.sell_BE.services.lnguyen.CommentService;
import com.nhom2.sell_BE.utils.GetUserUtil;
import com.nhom2.sell_BE.utils.JwtProviderUtils;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private UserRepositories userRepository;

    @Autowired
    private JwtProviderUtils jwtProviderUtils;

    @Override
    public List<CommentResponse> getAllCommentByProduct(String productId) {
        Product product = productRepository.findById(productId).orElseThrow(()-> new DataNotFoundException("Product Not Found"));
        List<Comment> comments = commentRepository.findAllByProduct(product);

        return comments.stream().map(CommentResponse::new).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public CommentResponse createComment(CommentRequest request) {
        return setupData(request, getUser());
    }

    @Override
    @Transactional
    public CommentResponse createCommentWS(CommentRequest request, String token) {
        return setupData(request, getUserOfSocket(token));
    }

    public CommentResponse setupData(CommentRequest request, User user){
        Comment comment = new Comment();
        comment.setContentComment(request.getContentComment());
        comment.setNumberStars(request.getNumberStars());

        Product product = productRepository.findById(request.getProductId()).orElseThrow(()-> new DataNotFoundException("Product Not Found"));
        comment.setProduct(product);

        comment.setUser(user);

        Comment newComment = commentRepository.save(comment);

        CommentResponse commentResponse = new CommentResponse();
        commentResponse.setCommentId(newComment.getCommentId());
        commentResponse.setContentComment(newComment.getContentComment());
        commentResponse.setNumberStars(newComment.getNumberStars());
        commentResponse.setTimeComment(LocalDateTime.now());
        commentResponse.setProductId(newComment.getProduct().getProductId());
        commentResponse.setFullName(newComment.getUser().getFullName());

        return commentResponse;
    }

    public User getUser(){
        Account account = accountRepository.findByusername(new GetUserUtil().GetUserName());
        User user = userRepository.findById(account.getUser().getUserId()).orElseThrow(()->new DataNotFoundException("User does not exist"));
        return user;
    }

    public User getUserOfSocket(String token){
        String username = jwtProviderUtils.getUserNameFromJwtToken(token);
        Account account = accountRepository.findByusername(username);
        User user = userRepository.findById(account.getUser().getUserId()).orElseThrow(()->new DataNotFoundException("User does not exist"));
        return user;
    }
}
