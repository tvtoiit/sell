package com.nhom2.sell_BE.services.lnguyen;

import com.nhom2.sell_BE.payload.request.CommentRequest;
import com.nhom2.sell_BE.payload.response.lnguyen.CommentResponse;

import java.util.List;

public interface CommentService {

    List<CommentResponse> getAllCommentByProduct(String productId);

    CommentResponse createComment(CommentRequest request);

    CommentResponse createCommentWS(CommentRequest request, String token);
}
